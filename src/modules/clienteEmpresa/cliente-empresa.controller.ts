import { Response, Request } from "express";
import { IParamsCreateClientCompany } from "./cliente-empresa.interfaces";
import { ClienteEmpresaService } from "./cliente-empresa.service";
import { handleError } from "../../helpers/utils";

export class ClienteEmpresaController {
  private readonly usuarioService: ClienteEmpresaService;

  constructor() {
    this.usuarioService = new ClienteEmpresaService();
  }

  create = async (
    req: Request<{}, {}, IParamsCreateClientCompany, {}>,
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
