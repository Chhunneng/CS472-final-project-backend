import type { Request, Response, NextFunction } from "express";
import * as aiService from "../services/aiService";

export async function generateDescription(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { productName, category, features } = req.body;

        if (!productName || !category) {
            res.status(400).json({
                error: "Product name and category are required",
            });
            return;
        }

        const description = await aiService.generateDescription({
            productName,
            category,
            features,
        });
        res.json(description);
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Failed to generate description" });
    }
}
