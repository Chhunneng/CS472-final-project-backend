import { v4 as uuidv4 } from "uuid"
import { db, updateProductRatings } from "../config/database"
import type { Review, CreateReviewDto, UpdateReviewDto } from "../models/reviewModel"

export async function getReviewsByProductId(productId: string): Promise<Review[]> {
  return await db.all(`SELECT * FROM reviews WHERE productId = ? ORDER BY date DESC`, [productId])
}

export async function getReviewById(id: string, productId: string): Promise<Review | null> {
  return await db.get(`SELECT * FROM reviews WHERE id = ? AND productId = ?`, [id, productId])
}

export async function createReview(productId: string, reviewData: CreateReviewDto): Promise<Review> {
  const id = uuidv4()
  const date = new Date().toISOString()

  await db.run(
    `INSERT INTO reviews (id, productId, author, rating, comment, date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, productId, reviewData.author, Number.parseInt(reviewData.rating.toString()), reviewData.comment, date],
  )

  // Update product rating
  await updateProductRatings(productId)

  return (await getReviewById(id, productId)) as Review
}

export async function updateReview(id: string, productId: string, reviewData: UpdateReviewDto): Promise<Review | null> {
  const review = await getReviewById(id, productId)

  if (!review) {
    return null
  }

  const date = new Date().toISOString()

  await db.run(`UPDATE reviews SET author = ?, rating = ?, comment = ?, date = ? WHERE id = ?`, [
    reviewData.author,
    Number.parseInt(reviewData.rating.toString()),
    reviewData.comment,
    date,
    id,
  ])

  // Update product rating
  await updateProductRatings(productId)

  return await getReviewById(id, productId)
}

export async function deleteReview(id: string, productId: string): Promise<boolean> {
  const result = await db.run(`DELETE FROM reviews WHERE id = ? AND productId = ?`, [id, productId])

  if (result.changes > 0) {
    // Update product rating
    await updateProductRatings(productId)
    return true
  }

  return false
}
