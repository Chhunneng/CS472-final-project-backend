import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { initializeSampleData } from "../data/sampleData";

export let db: any;

export async function initializeDatabase() {
  db = await open({
    filename: path.join(__dirname, "../../database.sqlite"),
    driver: sqlite3.Database,
  });

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

  const productCount = await db.get("SELECT COUNT(*) as count FROM products");

  if (productCount.count === 0) {
    await initializeSampleData();
  }
}

export async function calculateAverageRating(
  productId: string
): Promise<number> {
  const result = await db.get(
    `SELECT AVG(rating) as avgRating FROM reviews WHERE productId = ?`,
    [productId]
  );
  return result.avgRating ?? 5;
}

export async function updateProductRatings(productId: string): Promise<void> {
  const avgRating = await calculateAverageRating(productId);
  await db.run(`UPDATE products SET averageRating = ? WHERE id = ?`, [
    Number(avgRating.toFixed(1)),
    productId,
  ]);
}
