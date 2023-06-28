import { Router } from "express";
import { MovimentoController } from "./movimento.controller";
import { auth } from "../../middlewares/auth";

const movimentoController = new MovimentoController();
const movimentoRouter = Router();

movimentoRouter.post("/movimentos", auth, movimentoController.create);

export { movimentoRouter };
