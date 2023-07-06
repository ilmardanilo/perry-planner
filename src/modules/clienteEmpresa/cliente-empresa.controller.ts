import { Response, Request } from "express";
import { IParamsCreateClientCompany } from "./cliente-empresa.interfaces";
import { ClienteEmpresaService } from "./cliente-empresa.service";
import { handleError } from "../../helpers/utils";

export class ClienteEmpresaController {
  private readonly clienteEmpresaService: ClienteEmpresaService;

  constructor() {
    this.clienteEmpresaService = new ClienteEmpresaService();
  }

  create = async (
    req: Request<{}, {}, IParamsCreateClientCompany, {}>,
    res: Response
  ) => {
    try {
      const result = await this.clienteEmpresaService.create(req.body);

      res.status(201).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };

  getAllByCompanyId = async (
    req: Request<{ empresaId: string }, {}, {}, {}>,
    res: Response
  ) => {
    try {
      const { empresaId } = req.params;

      const result = await this.clienteEmpresaService.getAllByCompanyId(
        empresaId
      );

      res.status(200).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };

  delete = async (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      await this.clienteEmpresaService.delete(id);

      res.status(204).json();
    } catch (error) {
      handleError(res, error);
    }
  };
}
