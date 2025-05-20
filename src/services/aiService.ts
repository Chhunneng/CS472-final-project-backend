import { openai } from "../config/openai";
import type {
  DescriptionRequest,
  DescriptionResponse
} from "../models/aiModel";

export async function generateDescription(
  data: DescriptionRequest
): Promise<DescriptionResponse> {
  const { productName, category, features = [] } = data;

  let prompt = `Write a simple, clear product description for a ${category} product called "${productName}".`;

  if (features.length > 0) {
    prompt += ` Include these key features: ${features.join(", ")}.`;
  }

  prompt += ` Write in plain text without any formatting, markdown, or special characters. Keep it to 2-3 sentences that are easy to read.`;

  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content:
          "You are a professional product copywriter. Write clear, simple descriptions in plain text without any formatting or special characters. Focus on being direct and easy to understand.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 150,
    temperature: 0.7,
  });

  let description = completion.choices[0]?.message?.content?.trim() ?? "";

  description = description
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return { description };
}
