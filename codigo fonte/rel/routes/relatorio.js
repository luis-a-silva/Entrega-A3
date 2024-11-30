import express from "express";
import {getProdutoByQuantidade,getConsumoMedioByCliente,getProdutoMaisVendido,getTotalCompraByCliente } from "../controllers/relatorio.js";
const router = express.Router();

router.get("/getConsumoMedioByCliente", getConsumoMedioByCliente);
router.get("/getProdutoByQuantidade/:quantidade", getProdutoByQuantidade);
router.get("/getProdutoMaisVendido", getProdutoMaisVendido);
router.get("/getTotalCompraByCliente", getTotalCompraByCliente);

export default router;