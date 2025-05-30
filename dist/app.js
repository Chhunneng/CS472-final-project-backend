"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const aiRoutes_1 = __importDefault(require("./routes/aiRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
require('dotenv').config();
const app = (0, express_1.default)();
const allowedOrigins = ((_a = process.env.CORS_ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || [];
app.use((0, cors_1.default)({
    origin: allowedOrigins
}));
app.use(express_1.default.json());
app.use("/products", productRoutes_1.default);
app.use("/products", reviewRoutes_1.default);
app.use("/ai", aiRoutes_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocs));
app.use(errorHandler_1.errorHandler);
exports.default = app;
