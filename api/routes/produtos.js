import express from "express";
import { getProduto, addProduto,updateProduto,deleteProduto, getProdutoById } from "../controllers/produto.js";
const router = express.Router();

router.get("/getProduto", getProduto);
router.get("/getProdutoById/:id", getProdutoById);
router.post("/addProduto", addProduto);
router.put("/updateProduto/:id", updateProduto);
router.delete("/deleteProduto/:id", deleteProduto);


export default router;