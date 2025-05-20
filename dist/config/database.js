"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.initializeDatabase = initializeDatabase;
exports.calculateAverageRating = calculateAverageRating;
exports.updateProductRatings = updateProductRatings;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path_1 = __importDefault(require("path"));
const sampleData_1 = require("../data/sampleData");
// Initialize database
async function initializeDatabase() {
    // Open the database
    exports.db = await (0, sqlite_1.open)({
        filename: path_1.default.join(__dirname, "../../database.sqlite"),
        driver: sqlite3_1.default.Database,
    });
    // Create tables if they don't exist
    await exports.db.exec(`
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
    const productCount = await exports.db.get("SELECT COUNT(*) as count FROM products");
    if (productCount.count === 0) {
        await (0, sampleData_1.initializeSampleData)();
    }
}
// Helper function to calculate average rating
async function calculateAverageRating(productId) {
    var _a;
    const result = await exports.db.get(`SELECT AVG(rating) as avgRating FROM reviews WHERE productId = ?`, [productId]);
    return (_a = result.avgRating) !== null && _a !== void 0 ? _a : 5;
}
// Helper function to update product ratings
async function updateProductRatings(productId) {
    const avgRating = await calculateAverageRating(productId);
    await exports.db.run(`UPDATE products SET averageRating = ? WHERE id = ?`, [Number(avgRating.toFixed(1)), productId]);
}
