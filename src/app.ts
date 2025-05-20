import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger";
import productRoutes from "./routes/productRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import aiRoutes from "./routes/aiRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/products", reviewRoutes);
app.use("/ai", aiRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

export default app;