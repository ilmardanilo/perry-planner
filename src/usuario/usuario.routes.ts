import { Router } from "express";
import { UsuarioController } from "./usuario.controller";

const usuarioController = new UsuarioController();
const usuarioRouter = Router();

usuarioRouter.post("/usuarios", usuarioController.create);
usuarioRouter.post("/usuarios/login", usuarioController.login);
usuarioRouter.put("/usuarios/:usuarioId", usuarioController.update);

export { usuarioRouter };
