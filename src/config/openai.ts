import OpenAI from "openai";
require("dotenv").config();


export const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY || "your-api-key",
});
