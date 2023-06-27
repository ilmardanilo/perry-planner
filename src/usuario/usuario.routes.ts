import { Router } from "express";
import { UsuarioController } from "./usuario.controller";
import { auth } from "../middlewares/auth";

const usuarioController = new UsuarioController();
const usuarioRouter = Router();

usuarioRouter.post("/usuarios", usuarioController.create);
usuarioRouter.post("/usuarios/login", usuarioController.login);
usuarioRouter.get("/usuarios/:usuarioId", auth, usuarioController.getById);
usuarioRouter.put("/usuarios/:usuarioId", auth, usuarioController.update);
usuarioRouter.delete("/usuarios/:usuarioId", auth, usuarioController.delete);

export { usuarioRouter };
