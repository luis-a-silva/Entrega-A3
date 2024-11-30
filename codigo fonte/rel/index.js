import express from "express";
import cors from "cors";
import relatorioRoutes from "./routes/relatorio.js"; 

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", relatorioRoutes);
app.listen(3000);