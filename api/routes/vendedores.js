import express from "express";
import { getVendedor, addVendedor,updateVendedor,deleteVendedor, getVendedorById } from "../controllers/vendedor.js";
const router = express.Router();

router.get("/getVendedor", getVendedor);
router.get("/getVendedorById/:id", getVendedorById);
router.post("/addVendedor", addVendedor);
router.put("/updateVendedor/:id", updateVendedor);
router.delete("/deleteVendedor/:id", deleteVendedor);


export default router;