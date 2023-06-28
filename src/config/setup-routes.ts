import { Express } from "express";
import { usuarioRouter } from "../modules/usuario/usuario.routes";
import { clienteEmpresaRouter } from "../modules/clienteEmpresa/cliente-empresa.routes";
import { movimentoRouter } from "../modules/movimento/movimento.routes";

export const setupRoutes = (app: Express): void => {
  app.use("/", usuarioRouter);
  app.use("/", clienteEmpresaRouter);
  app.use("/", movimentoRouter);
};
