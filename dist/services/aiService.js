"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDescription = generateDescription;
const openai_1 = require("../config/openai");
async function generateDescription(data) {
    var _a, _b, _c, _d;
    const { productName, category, features = [] } = data;
    // Prepare prompt for AI with clear instructions for plain text output
    let prompt = `Write a simple, clear product description for a ${category} product called "${productName}".`;
    if (features.length > 0) {
        prompt += ` Include these key features: ${features.join(", ")}.`;
    }
    prompt += ` Write in plain text without any formatting, markdown, or special characters. Keep it to 2-3 sentences that are easy to read.`;
    // Call DeepSeek API
    const completion = await openai_1.openai.chat.completions.create({
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
    });
    // Clean up the response by removing any markdown or special formatting
    let description = (_d = (_c = (_b = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "";
    // Remove any markdown formatting
    description = description
        .replace(/\*\*/g, '') // Remove bold markers
        .replace(/\*/g, '') // Remove italic markers
        .replace(/\n/g, ' ') // Replace newlines with spaces
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();
    return { description };
}
