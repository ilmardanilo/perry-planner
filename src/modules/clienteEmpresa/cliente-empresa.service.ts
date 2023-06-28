import { IParamsCreateClientCompany } from "./cliente-empresa.interfaces";
import { prisma } from "../../config/prisma";
import { NotFoundError, UnprocessableEntityError } from "../../helpers/errors";

export class ClienteEmpresaService {
  async create(params: IParamsCreateClientCompany) {
    const {
      bairro,
      cpf_cnpj,
      nome,
      numero,
      telefone,
      rua,
      diaVencimento,
      empresaId
    } = params;
    let clientId = "";

    const user = await prisma.usuario.findUnique({
      where: { cpf_cnpj }
    });

    if (user) {
      clientId = user.id;
    } else {
      const newUser = await prisma.usuario.create({
        data: {
          nome,
          cpf_cnpj,
          telefone,
          bairro,
          numero,
          rua
        }
      });

      clientId = newUser.id;
    }

    const clientCompany = await prisma.clienteEmpresa.findFirst({
      where: {
        clienteId: clientId,
        empresaId
      }
    });

    if (clientCompany) {
      throw new UnprocessableEntityError(
        "Cliente já está cadastrado nessa empresa."
      );
    }

    return await prisma.clienteEmpresa.create({
      data: {
        clienteId: clientId,
        empresaId,
        diaVencimento: Number(diaVencimento)
      }
    });
  }

  async getAllByCompanyId(empresaId: string) {
    const company = await prisma.usuario.findUnique({
      where: {
        id: empresaId
      }
    });

    if (!company) {
      throw new NotFoundError("Empresa não existe.");
    }

    return await prisma.clienteEmpresa.findMany({
      where: {
        empresaId
      },
      include: {
        cliente: true,
        contas: true
      }
    });
  }
}
