import express from "express";
import { getCompra, addCompra, deleteCompra, getCompraById } from "../controllers/compra.js";
const router = express.Router();

router.get("/getCompra", getCompra);
router.get("/getCompraById/:id", getCompraById);
router.post("/addCompra", addCompra);
router.delete("/deleteCompra/:id", deleteCompra);

export default router;