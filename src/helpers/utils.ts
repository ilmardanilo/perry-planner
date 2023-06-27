import { HttpError } from "express-openapi-validator/dist/framework/types";
import { Response } from "express";

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
