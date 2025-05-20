"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openai = void 0;
const openai_1 = __importDefault(require("openai"));
require('dotenv').config();
// DeepSeek configuration
// Using OpenAI SDK with DeepSeek's API endpoint
exports.openai = new openai_1.default({
    baseURL: 'https://api.deepseek.com', // DeepSeek API endpoint
    apiKey: process.env.DEEPSEEK_API_KEY || "your-api-key", // Replace with your DeepSeek API key
});
