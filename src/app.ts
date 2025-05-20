import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger";
import productRoutes from "./routes/productRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import aiRoutes from "./routes/aiRoutes";
import { errorHandler } from "./middlewares/errorHandler";
require('dotenv').config();

const app = express();

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || [];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

app.use(express.json());

app.use("/products", productRoutes);
app.use("/products", reviewRoutes);
app.use("/ai", aiRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

export default app;