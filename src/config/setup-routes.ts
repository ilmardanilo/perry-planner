import { Express } from "express";
import { usuarioRouter } from "../usuario/usuario.routes";

export const setupRoutes = (app: Express): void => {
  app.use("/", usuarioRouter);
};
