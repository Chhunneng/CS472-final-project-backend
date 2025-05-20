"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = getAllProducts;
exports.searchProducts = searchProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getAllCategories = getAllCategories;
const uuid_1 = require("uuid");
const database_1 = require("../config/database");
async function getAllProducts(query) {
    const page = query.page || 1;
    const category = query.category;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    let sqlQuery = `SELECT * FROM products`;
    let countQuery = `SELECT COUNT(*) as total FROM products`;
    const queryParams = [];
    const countParams = [];
    // Filter by category if provided
    if (category) {
        sqlQuery += ` WHERE category = ?`;
        countQuery += ` WHERE category = ?`;
        queryParams.push(category);
        countParams.push(category);
    }
    // Sort by dateAdded (desc)
    sqlQuery += ` ORDER BY dateAdded DESC LIMIT ? OFFSET ?`;
    queryParams.push(pageSize, offset);
    // Get products
    const products = await database_1.db.all(sqlQuery, queryParams);
    // Get total count for pagination
    const countResult = await database_1.db.get(countQuery, countParams);
    const totalProducts = countResult.total;
    const totalPages = Math.ceil(totalProducts / pageSize);
    return {
        products,
        totalPages,
        currentPage: page,
    };
}
async function searchProducts(query) {
    return await database_1.db.all(`SELECT * FROM products WHERE LOWER(name) LIKE ?`, [`%${query.toLowerCase()}%`]);
}
async function getProductById(id) {
    return await database_1.db.get(`SELECT * FROM products WHERE id = ?`, [id]);
}
async function createProduct(product) {
    const id = (0, uuid_1.v4)();
    const averageRating = 5;
    await database_1.db.run(`INSERT INTO products (id, name, description, category, price, imageUrl, dateAdded, averageRating) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
        id,
        product.name,
        product.description,
        product.category,
        product.price,
        product.imageUrl || null,
        product.dateAdded,
        averageRating,
    ]);
    return (await getProductById(id));
}
async function updateProduct(id, product) {
    const existingProduct = await getProductById(id);
    if (!existingProduct) {
        return null;
    }
    const updates = [];
    const values = [];
    // Build dynamic update query
    if (product.name !== undefined) {
        updates.push("name = ?");
        values.push(product.name);
    }
    if (product.description !== undefined) {
        updates.push("description = ?");
        values.push(product.description);
    }
    if (product.category !== undefined) {
        updates.push("category = ?");
        values.push(product.category);
    }
    if (product.price !== undefined) {
        updates.push("price = ?");
        values.push(product.price);
    }
    if (product.imageUrl !== undefined) {
        updates.push("imageUrl = ?");
        values.push(product.imageUrl);
    }
    if (updates.length === 0) {
        return existingProduct;
    }
    // Add id to values array
    values.push(id);
    await database_1.db.run(`UPDATE products SET ${updates.join(", ")} WHERE id = ?`, values);
    return await getProductById(id);
}
async function deleteProduct(id) {
    const result = await database_1.db.run(`DELETE FROM products WHERE id = ?`, [id]);
    return result.changes > 0;
}
async function getAllCategories() {
    const categories = await database_1.db.all(`SELECT DISTINCT category FROM products ORDER BY category`);
    return categories.map((cat) => cat.category);
}
