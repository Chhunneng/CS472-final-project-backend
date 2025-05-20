import type { Request, Response, NextFunction } from "express";
import * as productService from "../services/productService";

export async function getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const page = Number.parseInt(req.query.page as string) || 1;
        const category = req.query.category as string | undefined;

        const result = await productService.getAllProducts({ page, category });
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function searchProducts(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const query = (req.query.q as string) || "";
        const products = await productService.searchProducts(query);
        res.json(products);
    } catch (error) {
        next(error);
    }
}

export async function getProductById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product = await productService.getProductById(req.params.id);

        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
}

export async function createProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const newProduct = await productService.createProduct({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            dateAdded: new Date().toISOString(),
        });

        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
}

export async function updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const updatedProduct = await productService.updateProduct(
            req.params.id,
            req.body
        );

        if (!updatedProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
}

export async function deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const success = await productService.deleteProduct(req.params.id);

        if (!success) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
}

export async function getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const categories = await productService.getAllCategories();
        res.json(categories);
    } catch (error) {
        next(error);
    }
}
