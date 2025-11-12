import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.js";

dotenv.config();

const app = express();
app.use(cors()); // permet au frontend d'accéder à l'API
app.use(express.json());

app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
