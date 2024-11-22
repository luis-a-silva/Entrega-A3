import express from "express";
import { getCompra, addCompra, deleteCompra, getCompraById,getConsumoMedioByCliente,getProdutoMaisVendido,getTotalCompraByCliente } from "../controllers/compra.js";
const router = express.Router();

router.get("/getCompra", getCompra);
router.get("/getConsumoMedioByCliente", getConsumoMedioByCliente);
router.get("/getProdutoMaisVendido", getProdutoMaisVendido);
router.get("/getTotalCompraByCliente", getTotalCompraByCliente);
router.get("/getCompraById/:id", getCompraById);
router.post("/addCompra", addCompra);
router.delete("/deleteCompra/:id", deleteCompra);

export default router;