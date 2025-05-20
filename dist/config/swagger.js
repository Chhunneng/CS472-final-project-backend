"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Product Review API",
            version: "1.0.0",
            description: "API for managing products and reviews",
        },
        servers: [
            {
                url: process.env.API_URL || `http://localhost:${process.env.PORT || 3000}`,
                description: process.env.NODE_ENV === 'production' ? "Production server" : "Development server",
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // Path to the API docs
};
exports.swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
