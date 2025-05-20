export interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  imageUrl?: string
  dateAdded: string
  averageRating: number
}

export interface ProductQuery {
  page?: number
  category?: string
}

export interface PaginatedProducts {
  products: Product[]
  totalPages: number
  currentPage: number
}
