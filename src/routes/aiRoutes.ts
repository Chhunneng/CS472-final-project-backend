import express from "express"
import * as aiController from "../controllers/aiController"
import { validate } from "../middleware/validationMiddleware"
import { aiDescriptionSchema } from "../validations/schemas"

const router = express.Router()

/**
 * @swagger
 * /ai/generate-description:
 *   post:
 *     summary: Generate a product description using AI
 *     description: Uses AI to generate a product description based on provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - category
 *             properties:
 *               productName:
 *                 type: string
 *               category:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Generated description
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 */
router.post("/generate-description", validate(aiDescriptionSchema), aiController.generateDescription)

export default router
