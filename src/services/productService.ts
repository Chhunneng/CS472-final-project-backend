import { v4 as uuidv4 } from "uuid"
import { db } from "../config/database"
import type { Product, ProductQuery, PaginatedProducts } from "../models/productModel"

export async function getAllProducts(query: ProductQuery): Promise<PaginatedProducts> {
  const page = query.page || 1
  const category = query.category
  const pageSize = 10
  const offset = (page - 1) * pageSize

  let sqlQuery = `SELECT * FROM products`
  let countQuery = `SELECT COUNT(*) as total FROM products`
  const queryParams: any[] = []
  const countParams: any[] = []

  // Filter by category if provided
  if (category) {
    sqlQuery += ` WHERE category = ?`
    countQuery += ` WHERE category = ?`
    queryParams.push(category)
    countParams.push(category)
  }

  // Sort by dateAdded (desc)
  sqlQuery += ` ORDER BY dateAdded DESC LIMIT ? OFFSET ?`
  queryParams.push(pageSize, offset)

  // Get products
  const products = await db.all(sqlQuery, queryParams)

  // Get total count for pagination
  const countResult = await db.get(countQuery, countParams)
  const totalProducts = countResult.total
  const totalPages = Math.ceil(totalProducts / pageSize)

  return {
    products,
    totalPages,
    currentPage: page,
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  return await db.all(`SELECT * FROM products WHERE LOWER(name) LIKE ?`, [`%${query.toLowerCase()}%`])
}

export async function getProductById(id: string): Promise<Product | null> {
  return await db.get(`SELECT * FROM products WHERE id = ?`, [id])
}

export async function createProduct(product: Omit<Product, "id" | "averageRating">): Promise<Product> {
  const id = uuidv4()
  const averageRating = 5

  await db.run(
    `INSERT INTO products (id, name, description, category, price, imageUrl, dateAdded, averageRating) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      product.name,
      product.description,
      product.category,
      product.price,
      product.imageUrl || null,
      product.dateAdded,
      averageRating,
    ],
  )

  return (await getProductById(id)) as Product
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product | null> {
  const existingProduct = await getProductById(id)

  if (!existingProduct) {
    return null
  }

  const updates: string[] = []
  const values: any[] = []

  // Build dynamic update query
  if (product.name !== undefined) {
    updates.push("name = ?")
    values.push(product.name)
  }

  if (product.description !== undefined) {
    updates.push("description = ?")
    values.push(product.description)
  }

  if (product.category !== undefined) {
    updates.push("category = ?")
    values.push(product.category)
  }

  if (product.price !== undefined) {
    updates.push("price = ?")
    values.push(product.price)
  }

  if (product.imageUrl !== undefined) {
    updates.push("imageUrl = ?")
    values.push(product.imageUrl)
  }

  if (updates.length === 0) {
    return existingProduct
  }

  // Add id to values array
  values.push(id)

  await db.run(`UPDATE products SET ${updates.join(", ")} WHERE id = ?`, values)

  return await getProductById(id)
}

export async function deleteProduct(id: string): Promise<boolean> {
  const result = await db.run(`DELETE FROM products WHERE id = ?`, [id])
  return result.changes > 0
}

export async function getAllCategories(): Promise<string[]> {
  const categories = await db.all(`SELECT DISTINCT category FROM products ORDER BY category`)
  return categories.map((cat: { category: string }) => cat.category)
}
