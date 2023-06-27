import { Response, Request } from "express";
import { IParamsCreateUser } from "./usuario.interfaces";
import { UsuarioService } from "./usuario.service";
import { handleError } from "../helpers/utils";

export class UsuarioController {
  private readonly usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  create = async (
    req: Request<{}, {}, IParamsCreateUser, {}>,
    res: Response
  ) => {
    try {
      const result = await this.usuarioService.create(req.body);

      res.status(201).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
}
