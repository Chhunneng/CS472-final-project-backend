"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviews = getReviews;
exports.createReview = createReview;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
const reviewService = __importStar(require("../services/reviewService"));
const productService = __importStar(require("../services/productService"));
async function getReviews(req, res, next) {
    try {
        const productId = req.params.id;
        const reviews = await reviewService.getReviewsByProductId(productId);
        res.json(reviews);
    }
    catch (error) {
        next(error);
    }
}
async function createReview(req, res, next) {
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
    }
    catch (error) {
        next(error);
    }
}
async function updateReview(req, res, next) {
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
    }
    catch (error) {
        next(error);
    }
}
async function deleteReview(req, res, next) {
    try {
        const { productId, id } = req.params;
        const success = await reviewService.deleteReview(id, productId);
        if (!success) {
            res.status(404).json({ error: "Review not found" });
            return;
        }
        res.json({ message: "Review deleted successfully" });
    }
    catch (error) {
        next(error);
    }
}
