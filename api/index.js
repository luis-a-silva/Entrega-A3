import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js"; 
import vendedorRoutes from "./routes/vendedores.js"; 
import produtoRoutes from "./routes/produtos.js"; 
import compraRoutes from "./routes/compras.js"; 

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", userRoutes);
app.use("/", vendedorRoutes);
app.use("/", produtoRoutes);
app.use("/", compraRoutes);
app.listen(8800);