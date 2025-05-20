import {Router} from "express"
import * as productController from "../controllers/productController"
import { validate } from "../middleware/validationMiddleware"
import { productSchema } from "../validations/schemas"

const router = Router()

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products with optional pagination and category filtering
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 */
router.get("/", productController.getAllProducts)

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search for products by name
 *     description: Returns products whose names match the search query
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: A list of matching products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/search", productController.searchProducts)

/**
 * @swagger
 * /products/categories:
 *   get:
 *     summary: Get all product categories
 *     description: Returns a list of all unique product categories
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/categories", productController.getAllCategories)

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by id
 *     description: Returns a single product by its id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get("/:id", productController.getProductById)

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/", validate(productSchema), productController.createProduct)

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Updates an existing product
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.put("/:id", validate(productSchema), productController.updateProduct)

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     responses:
 *       200:
 *         description: Success message
 *       404:
 *         description: Product not found
 */
router.delete("/:id", productController.deleteProduct)

export default router
