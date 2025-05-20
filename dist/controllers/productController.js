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
exports.getAllProducts = getAllProducts;
exports.searchProducts = searchProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getAllCategories = getAllCategories;
const productService = __importStar(require("../services/productService"));
async function getAllProducts(req, res, next) {
    try {
        const page = Number.parseInt(req.query.page) || 1;
        const category = req.query.category;
        const result = await productService.getAllProducts({ page, category });
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
async function searchProducts(req, res, next) {
    try {
        const query = req.query.q || "";
        const products = await productService.searchProducts(query);
        res.json(products);
    }
    catch (error) {
        next(error);
    }
}
async function getProductById(req, res, next) {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}
async function createProduct(req, res, next) {
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
    }
    catch (error) {
        next(error);
    }
}
async function updateProduct(req, res, next) {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json(updatedProduct);
    }
    catch (error) {
        next(error);
    }
}
async function deleteProduct(req, res, next) {
    try {
        const success = await productService.deleteProduct(req.params.id);
        if (!success) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        next(error);
    }
}
async function getAllCategories(req, res, next) {
    try {
        const categories = await productService.getAllCategories();
        res.json(categories);
    }
    catch (error) {
        next(error);
    }
}
