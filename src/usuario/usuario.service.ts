import {
  IParamsCreateUser,
  IParamsUpdateUser,
  IUsuario
} from "./usuario.interfaces";
import { prisma } from "../config/prisma";
import { NotFoundError, UnprocessableEntityError } from "../helpers/errors";
import { SECRET_KEY } from "../config/environment-consts";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export class UsuarioService {
  async create(params: IParamsCreateUser) {
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

  async login(email: string, password: string) {
    const user = await prisma.usuario.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundError("Email incorreto.");
    }

    const isValidPassword = await compare(password, String(user.senha));

    if (!isValidPassword) {
      throw new UnprocessableEntityError("Senha incorreta.");
    }

    const token = sign({ id: user.id, cpfCnpj: user.cpj_cnpj }, SECRET_KEY, {
      expiresIn: "30 days"
    });

    return {
      id: user.id,
      nome: user.nome,
      token
    };
  }

  async getById(userId: string) {
    const user = await prisma.usuario.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError("Usuário não existe.");
    }

    user.senha = "";

    return user;
  }

  async update(userId: string, params: IParamsUpdateUser) {
    const user = await prisma.usuario.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError("Usuário não existe.");
    }

    await prisma.usuario.update({
      where: { id: userId },
      data: { ...user, ...params, updatedAt: new Date() }
    });
  }

  async delete(userId: string) {
    const user = await prisma.usuario.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError("Usuário não existe.");
    }

    await prisma.usuario.delete({ where: { id: userId } });
  }
}
