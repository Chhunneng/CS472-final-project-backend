"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiDescriptionSchema = exports.reviewSchema = exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required").max(100, "Product name is too long"),
    description: zod_1.z.string().min(1, "Description is required").max(1000, "Description is too long"),
    category: zod_1.z.string().min(1, "Category is required"),
    price: zod_1.z.number().positive("Price must be greater than 0"),
    imageUrl: zod_1.z.string().url("Invalid image URL").optional().or(zod_1.z.literal("")),
});
exports.reviewSchema = zod_1.z.object({
    author: zod_1.z.string().min(1, "Author name is required").max(100, "Author name is too long"),
    rating: zod_1.z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot be more than 5"),
    comment: zod_1.z.string().min(1, "Comment is required").max(500, "Comment is too long"),
});
exports.aiDescriptionSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1, "Product name is required"),
    category: zod_1.z.string().min(1, "Category is required"),
    features: zod_1.z.array(zod_1.z.string()).optional(),
});
