export interface DescriptionRequest {
  productName: string
  category: string
  features?: string[]
}

export interface DescriptionResponse {
  description: string
}

export interface SentimentRequest {
  review: string
}

export interface SentimentResponse {
  sentiment: "positive" | "neutral" | "negative"
  score: number
  analysis: string
}
