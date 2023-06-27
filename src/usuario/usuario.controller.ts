import { Response, Request } from "express";
import { IParamsCreateUser, IParamsUpdateUser } from "./usuario.interfaces";
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

  login = async (
    req: Request<{}, {}, { email: string; senha: string }, {}>,
    res: Response
  ) => {
    try {
      const { email, senha } = req.body;

      const result = await this.usuarioService.login(email, senha);

      res.status(200).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };

  getById = async (
    req: Request<{ usuarioId: string }, {}, {}, {}>,
    res: Response
  ) => {
    try {
      const { usuarioId } = req.params;

      const result = await this.usuarioService.getById(usuarioId);

      res.status(200).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };

  update = async (
    req: Request<{ usuarioId: string }, {}, IParamsUpdateUser, {}>,
    res: Response
  ) => {
    try {
      const { usuarioId } = req.params;

      await this.usuarioService.update(usuarioId, req.body);

      res.status(204).json();
    } catch (error) {
      handleError(res, error);
    }
  };

  delete = async (
    req: Request<{ usuarioId: string }, {}, {}, {}>,
    res: Response
  ) => {
    try {
      const { usuarioId } = req.params;

      await this.usuarioService.delete(usuarioId);

      res.status(204).json();
    } catch (error) {
      handleError(res, error);
    }
  };
}
