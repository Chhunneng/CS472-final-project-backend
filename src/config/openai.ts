import OpenAI from "openai";
require('dotenv').config();
// DeepSeek configuration
// Using OpenAI SDK with DeepSeek's API endpoint
export const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com', // DeepSeek API endpoint
  apiKey: process.env.DEEPSEEK_API_KEY || "your-api-key", // Replace with your DeepSeek API key
});
