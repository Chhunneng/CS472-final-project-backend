import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { initializeSampleData } from "../data/sampleData";

// Database instance
export let db: any;

// Initialize database
export async function initializeDatabase() {
  // Open the database
  db = await open({
    filename: path.join(__dirname, "../../database.sqlite"),
    driver: sqlite3.Database,
  });

  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      imageUrl TEXT,
      dateAdded TEXT NOT NULL,
      averageRating REAL DEFAULT 5
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      productId TEXT NOT NULL,
      author TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (productId) REFERENCES products (id)
    );
  `);

  // Check if we need to add sample data
  const productCount = await db.get("SELECT COUNT(*) as count FROM products");

  if (productCount.count === 0) {
    await initializeSampleData();
  }
}

// Helper function to calculate average rating
export async function calculateAverageRating(productId: string): Promise<number> {
  const result = await db.get(`SELECT AVG(rating) as avgRating FROM reviews WHERE productId = ?`, [productId]);
  return result.avgRating ?? 5;
}

// Helper function to update product ratings
export async function updateProductRatings(productId: string): Promise<void> {
  const avgRating = await calculateAverageRating(productId);
  await db.run(`UPDATE products SET averageRating = ? WHERE id = ?`, [Number(avgRating.toFixed(1)), productId]);
}