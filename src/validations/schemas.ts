import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100, "Product name is too long"),
  description: z.string().min(1, "Description is required").max(1000, "Description is too long"),
  category: z.string().min(1, "Category is required"),
  price: z.number().positive("Price must be greater than 0"),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export const reviewSchema = z.object({
  author: z.string().min(1, "Author name is required").max(100, "Author name is too long"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot be more than 5"),
  comment: z.string().min(1, "Comment is required").max(500, "Comment is too long"),
});

export const aiDescriptionSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  features: z.array(z.string()).optional(),
});
