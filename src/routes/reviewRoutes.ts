import express from "express"
import * as reviewController from "../controllers/reviewController"
import { validate } from "../middleware/validationMiddleware"
import { reviewSchema } from "../validations/schemas"

const router = express.Router()

/**
 * @swagger
 * /products/{id}/reviews:
 *   get:
 *     summary: Get all reviews for a product
 *     description: Returns all reviews for a specific product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     responses:
 *       200:
 *         description: An array of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get("/:id/reviews", reviewController.getReviews)

/**
 * @swagger
 * /products/{id}/reviews:
 *   post:
 *     summary: Add a review for a product
 *     description: Creates a new review for a specific product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - rating
 *               - comment
 *             properties:
 *               author:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Product not found
 */
router.post("/:id/reviews", validate(reviewSchema), reviewController.createReview)

/**
 * @swagger
 * /products/{productId}/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     description: Updates an existing review
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - rating
 *               - comment
 *             properties:
 *               author:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */
router.put("/:productId/reviews/:id", validate(reviewSchema), reviewController.updateReview)

/**
 * @swagger
 * /products/{productId}/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     description: Deletes a review
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review id
 *     responses:
 *       200:
 *         description: Success message
 *       404:
 *         description: Review not found
 */
router.delete("/:productId/reviews/:id", reviewController.deleteReview)

export default router
