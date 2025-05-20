import { openai } from "../config/openai"
import type { DescriptionRequest, DescriptionResponse, SentimentRequest, SentimentResponse } from "../models/aiModel"

export async function generateDescription(data: DescriptionRequest): Promise<DescriptionResponse> {
  const { productName, category, features = [] } = data

  // Prepare prompt for AI with clear instructions for plain text output
  let prompt = `Write a simple, clear product description for a ${category} product called "${productName}".`

  if (features.length > 0) {
    prompt += ` Include these key features: ${features.join(", ")}.`
  }

  prompt += ` Write in plain text without any formatting, markdown, or special characters. Keep it to 2-3 sentences that are easy to read.`

  // Call DeepSeek API
  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      { 
        role: "system", 
        content: "You are a professional product copywriter. Write clear, simple descriptions in plain text without any formatting or special characters. Focus on being direct and easy to understand." 
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 150,
    temperature: 0.7,
  })

  // Clean up the response by removing any markdown or special formatting
  let description = completion.choices[0]?.message?.content?.trim() ?? ""
  
  // Remove any markdown formatting
  description = description
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\*/g, '')   // Remove italic markers
    .replace(/\n/g, ' ')  // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()

  return { description }
}
