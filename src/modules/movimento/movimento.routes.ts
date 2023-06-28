import { Router } from "express";
import { MovimentoController } from "./movimento.controller";
import { auth } from "../../middlewares/auth";

const movimentoController = new MovimentoController();
const movimentoRouter = Router();

movimentoRouter.post("/movimentos", auth, movimentoController.create);
movimentoRouter.get("/movimentos/:contaId", auth, movimentoController.getAllByAccountId);

export { movimentoRouter };
