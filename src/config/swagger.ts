import swaggerJsDoc from "swagger-jsdoc";

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
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API docs
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);