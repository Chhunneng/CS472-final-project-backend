export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface CreateReviewDto {
  author: string
  rating: number
  comment: string
}

export interface UpdateReviewDto {
  author: string
  rating: number
  comment: string
}
