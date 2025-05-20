import { v4 as uuidv4 } from "uuid"
import { db } from "../config/database"

export async function initializeSampleData() {
  const sampleProducts = [
    {
      id: uuidv4(),
      name: "Smartphone X",
      description: "Latest smartphone with advanced features",
      category: "Electronics",
      price: 999.99,
      imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=500",
      dateAdded: new Date().toISOString(),
      averageRating: 5,
    },
    {
      id: uuidv4(),
      name: "Laptop Pro",
      description: "High-performance laptop for professionals",
      category: "Electronics",
      price: 1499.99,
      imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=500",
      dateAdded: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      averageRating: 5,
    },
    {
      id: uuidv4(),
      name: "Wireless Headphones",
      description: "Premium noise-cancelling headphones",
      category: "Audio",
      price: 299.99,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",
      dateAdded: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      averageRating: 5,
    },
    {
      id: uuidv4(),
      name: "Smart Watch",
      description: "Fitness tracker and smartwatch",
      category: "Wearables",
      price: 199.99,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500",
      dateAdded: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      averageRating: 5,
    },
    {
      id: uuidv4(),
      name: "Bluetooth Speaker",
      description: "Portable wireless speaker with deep bass",
      category: "Audio",
      price: 129.99,
      imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=500",
      dateAdded: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      averageRating: 5,
    },
  ]

  // Insert sample products
  for (const product of sampleProducts) {
    await db.run(
      `INSERT INTO products (id, name, description, category, price, imageUrl, dateAdded, averageRating) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product.id,
        product.name,
        product.description,
        product.category,
        product.price,
        product.imageUrl,
        product.dateAdded,
        product.averageRating,
      ],
    )
  }

  console.log("Sample products added")
}
