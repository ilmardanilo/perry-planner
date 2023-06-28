import { HttpError } from "express-openapi-validator/dist/framework/types";
import { Response } from "express";
import { EMonth } from "../modules/movimento/movimento.interfaces";

export const handleError = (res: Response, error: any) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error instanceof Error) {
    console.error(
      JSON.stringify({
        eventName: "server.error",
        message: error.message,
        stack: error.stack
      })
    );
  }

  return res.status(500).json({ message: "Unexpected error!" });
};

export const getMonthString = (month: number): EMonth => {
  let monthString: EMonth;

  switch (month) {
    case 0:
      monthString = EMonth.JANEIRO;
      break;
    case 1:
      monthString = EMonth.FEVEREIRO;
      break;
    case 2:
      monthString = EMonth.MARCO;
      break;
    case 3:
      monthString = EMonth.ABRIL;
      break;
    case 4:
      monthString = EMonth.MAIO;
      break;
    case 5:
      monthString = EMonth.JUNHO;
      break;
    case 6:
      monthString = EMonth.JULHO;
      break;
    case 7:
      monthString = EMonth.AGOSTO;
      break;
    case 8:
      monthString = EMonth.SETEMBRO;
      break;
    case 9:
      monthString = EMonth.OUTUBRO;
      break;
    case 10:
      monthString = EMonth.NOVEMBRO;
      break;
    case 11:
      monthString = EMonth.DEZEMBRO;
      break;
    default:
      monthString = EMonth.JANEIRO;
      break;
  }

  return monthString;
};
