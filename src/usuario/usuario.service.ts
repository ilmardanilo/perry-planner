import { IParamsCreateUser } from "./usuario.interfaces";
import { prisma } from "../config/prisma";
import { UnprocessableEntityError } from "../helpers/errors";
import { SECRET_KEY } from "../config/environment-consts";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export class UsuarioService {
  async create(params: IParamsCreateUser): Promise<any> {
    const { email, cpj_cnpj, senha } = params;

    if (email) {
      const userEmail = await prisma.usuario.findUnique({ where: { email } });

      if (userEmail) {
        throw new UnprocessableEntityError(
          "Já existe um usuário com esse Email."
        );
      }
    }

    const userCpfCnpj = await prisma.usuario.findUnique({
      where: { cpj_cnpj }
    });

    if (userCpfCnpj) {
      throw new UnprocessableEntityError(
        "Já existe um usuário com esse CPF/CNPJ."
      );
    }

    let passwordHash = "";
    if (senha) {
      passwordHash = await hash(senha, 12);
    }

    const user = await prisma.usuario.create({
      data: {
        ...params,
        senha: passwordHash
      }
    });

    const token = sign({ id: user.id, cpfCnpj: cpj_cnpj }, SECRET_KEY, {
      expiresIn: "30 days"
    });

    return {
      id: user.id,
      nome: user.nome,
      token
    };
  }
}
