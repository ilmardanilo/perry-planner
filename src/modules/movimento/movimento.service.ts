import { ETypeMovement, IParamsCreateMovement } from "./movimento.interfaces";
import { prisma } from "../../config/prisma";
import { NotFoundError, UnprocessableEntityError } from "../../helpers/errors";
import { getMonthString } from "../../helpers/utils";
import moment from "moment";

export class MovimentoService {
  async create({
    clienteId,
    empresaId,
    valor,
    tipo,
    descricao
  }: IParamsCreateMovement) {
    const clientCompany = await prisma.clienteEmpresa.findFirst({
      where: {
        clienteId,
        empresaId
      }
    });

    if (!clientCompany) {
      throw new UnprocessableEntityError(
        "Cliente não tem vínculo com essa empresa."
      );
    }

    const currentDate = new Date();
    const yearDate = currentDate.getFullYear();
    const monthDate = currentDate.getMonth();
    const month = getMonthString(monthDate);

    let accountId = "";
    const account = await prisma.conta.findFirst({
      where: {
        clienteEmpresaId: clientCompany.id,
        mesReferente: month,
        anoReferente: yearDate
      }
    });

    if (!account) {
      const yearExpiration = monthDate + 1 > 11 ? yearDate + 1 : yearDate;
      const monthExpiration = getMonthExpiration(monthDate, 1);

      const expirationDate = new Date(
        yearExpiration,
        monthExpiration,
        clientCompany.diaVencimento
      );

      const closingDate = moment(expirationDate).subtract(5, "days").toDate();

      const newAccount = await prisma.conta.create({
        data: {
          clienteEmpresaId: clientCompany.id,
          mesReferente: month,
          anoReferente: yearDate,
          totalSemJuros: valor,
          dataVencimento: expirationDate,
          dataFechamento: closingDate,
          estaPaga: valor <= 0
        }
      });

      accountId = newAccount.id;
    }

    if (account && account.dataFechamento > currentDate) {
      const totalWithoutInterest =
        tipo === ETypeMovement.COMPRA
          ? account.totalSemJuros + valor
          : account.totalSemJuros - valor;

      const itsPaid = totalWithoutInterest <= 0;

      await prisma.conta.update({
        where: {
          id: account.id
        },
        data: {
          ...account,
          totalSemJuros: totalWithoutInterest,
          estaPaga: itsPaid,
          updatedAt: currentDate
        }
      });

      accountId = account.id;
    } else if (account && account.dataFechamento <= currentDate) {
      const yearExpiration = monthDate + 2 > 11 ? yearDate + 1 : yearDate;
      const monthExpiration = getMonthExpiration(monthDate, 2);

      const expirationDate = new Date(
        yearExpiration,
        monthExpiration,
        clientCompany.diaVencimento
      );

      const closingDate = moment(expirationDate).subtract(5, "days").toDate();

      const newAccount = await prisma.conta.create({
        data: {
          clienteEmpresaId: clientCompany.id,
          mesReferente: getMonthString(monthDate + 1),
          anoReferente: yearDate,
          totalSemJuros: valor,
          dataVencimento: expirationDate,
          dataFechamento: closingDate,
          estaPaga: valor <= 0
        }
      });

      accountId = newAccount.id;
    }

    return await prisma.movimento.create({
      data: {
        contaId: accountId,
        valor,
        tipo,
        descricao: descricao || ""
      }
    });
  }

  async getAllByAccountId(contaId: string) {
    const account = await prisma.conta.findUnique({
      where: {
        id: contaId
      }
    });

    if (!account) {
      throw new NotFoundError("Conta não existe.");
    }

    return await prisma.movimento.findMany({
      where: {
        contaId
      }
    });
  }
}

const getMonthExpiration = (
  monthDate: number,
  qtMonthsLater: number
): number => {
  if (monthDate + qtMonthsLater > 11) {
    if (monthDate + qtMonthsLater === 12) {
      return 0;
    }
    return 1;
  }

  return monthDate + qtMonthsLater;
};
