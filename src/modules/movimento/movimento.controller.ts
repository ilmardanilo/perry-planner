import { Response, Request } from "express";
import { IParamsCreateMovement } from "./movimento.interfaces";
import { MovimentoService } from "./movimento.service";
import { handleError } from "../../helpers/utils";

export class MovimentoController {
  private readonly movimentoService: MovimentoService;

  constructor() {
    this.movimentoService = new MovimentoService();
  }

  create = async (
    req: Request<{}, {}, IParamsCreateMovement, {}>,
    res: Response
  ) => {
    try {
      const result = await this.movimentoService.create(req.body);

      res.status(201).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };

  getAllByAccountId = async (
    req: Request<{ contaId: string }, {}, {}, {}>,
    res: Response
  ) => {
    try {
      const { contaId } = req.params;

      const result = await this.movimentoService.getAllByAccountId(contaId);

      res.status(200).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
}
