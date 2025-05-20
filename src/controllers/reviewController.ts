import type { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/reviewService";
import * as productService from "../services/productService";

export async function getReviews(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const productId = req.params.id;
        const reviews = await reviewService.getReviewsByProductId(productId);
        res.json(reviews);
    } catch (error) {
        next(error);
    }
}

export async function createReview(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const productId = req.params.id;
        const { author, rating, comment } = req.body;

        if (!author || !rating || !comment) {
            res.status(400).json({
                error: "Author, rating, and comment are required",
            });
            return;
        }

        const product = await productService.getProductById(productId);
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        const newReview = await reviewService.createReview(productId, {
            author,
            rating,
            comment,
        });
        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
}

export async function updateReview(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { productId, id } = req.params;
        const { author, rating, comment } = req.body;

        if (!author || !rating || !comment) {
            res.status(400).json({
                error: "Author, rating, and comment are required",
            });
            return;
        }

        const updatedReview = await reviewService.updateReview(id, productId, {
            author,
            rating,
            comment,
        });

        if (!updatedReview) {
            res.status(404).json({ error: "Review not found" });
            return;
        }

        res.json(updatedReview);
    } catch (error) {
        next(error);
    }
}

export async function deleteReview(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { productId, id } = req.params;
        const success = await reviewService.deleteReview(id, productId);

        if (!success) {
            res.status(404).json({ error: "Review not found" });
            return;
        }

        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        next(error);
    }
}
