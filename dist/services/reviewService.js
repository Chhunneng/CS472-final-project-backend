"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByProductId = getReviewsByProductId;
exports.getReviewById = getReviewById;
exports.createReview = createReview;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
const uuid_1 = require("uuid");
const database_1 = require("../config/database");
async function getReviewsByProductId(productId) {
    return await database_1.db.all(`SELECT * FROM reviews WHERE productId = ? ORDER BY date DESC`, [productId]);
}
async function getReviewById(id, productId) {
    return await database_1.db.get(`SELECT * FROM reviews WHERE id = ? AND productId = ?`, [id, productId]);
}
async function createReview(productId, reviewData) {
    const id = (0, uuid_1.v4)();
    const date = new Date().toISOString();
    await database_1.db.run(`INSERT INTO reviews (id, productId, author, rating, comment, date)
     VALUES (?, ?, ?, ?, ?, ?)`, [id, productId, reviewData.author, Number.parseInt(reviewData.rating.toString()), reviewData.comment, date]);
    // Update product rating
    await (0, database_1.updateProductRatings)(productId);
    return (await getReviewById(id, productId));
}
async function updateReview(id, productId, reviewData) {
    const review = await getReviewById(id, productId);
    if (!review) {
        return null;
    }
    const date = new Date().toISOString();
    await database_1.db.run(`UPDATE reviews SET author = ?, rating = ?, comment = ?, date = ? WHERE id = ?`, [
        reviewData.author,
        Number.parseInt(reviewData.rating.toString()),
        reviewData.comment,
        date,
        id,
    ]);
    // Update product rating
    await (0, database_1.updateProductRatings)(productId);
    return await getReviewById(id, productId);
}
async function deleteReview(id, productId) {
    const result = await database_1.db.run(`DELETE FROM reviews WHERE id = ? AND productId = ?`, [id, productId]);
    if (result.changes > 0) {
        // Update product rating
        await (0, database_1.updateProductRatings)(productId);
        return true;
    }
    return false;
}
