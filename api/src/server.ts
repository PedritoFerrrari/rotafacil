import express from "express";
import cors from "cors";
import { EncomendaService } from "./services/EncomendaService";
import { EncomendaController } from "./controllers/EncomendaController";

const app = express();
app.use(cors());
app.use(express.json());

const service = new EncomendaService();
const controller = new EncomendaController(service);

app.get("/encomendas", controller.listar);
app.post("/encomendas", controller.criar);
app.patch("/encomendas/:codigo/status", controller.atualizarStatus);
app.get("/encomendas/:codigo/historico", controller.historico);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`API RotaFácil rodando em http://localhost:${PORT}`);
});