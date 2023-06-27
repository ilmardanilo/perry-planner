import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../config/environment-consts";
import { UnauthorizedError } from "../helpers/errors";
import { handleError } from "../helpers/utils";
import { JwtPayload, verify } from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      throw new UnauthorizedError("O campo Authorization está faltando.");
    }

    verifyToken(token);

    next();
  } catch (error) {
    handleError(res, error);
  }
};

const verifyToken = (token: string): { id: string } => {
  try {
    const tokenDecoded = verify(token, SECRET_KEY) as JwtPayload;

    return { id: tokenDecoded.id };
  } catch (error: any) {
    if (error?.message === "jwt expired") {
      throw new UnauthorizedError("Token expirado.");
    }
    throw new UnauthorizedError("Token Inválido.");
  }
};
