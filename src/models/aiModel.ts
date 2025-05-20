export interface DescriptionRequest {
  productName: string
  category: string
  features?: string[]
}

export interface DescriptionResponse {
  description: string
}
