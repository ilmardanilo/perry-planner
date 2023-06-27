import { Express } from "express";
import { usuarioRouter } from "../modules/usuario/usuario.routes";

export const setupRoutes = (app: Express): void => {
  app.use("/", usuarioRouter);
};
