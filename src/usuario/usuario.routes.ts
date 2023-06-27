import { Router } from "express";
import { UsuarioController } from "./usuario.controller";

const usuarioController = new UsuarioController();
const usuarioRouter = Router();

usuarioRouter.post("/usuarios", usuarioController.create);

export { usuarioRouter };
