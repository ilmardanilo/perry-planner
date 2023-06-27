import { resolve } from "path";
import { config } from "dotenv";

config({ path: resolve(__dirname, "../../.env") });

export const PORT = process.env.PORT != null || 3333;
export const SECRET_KEY = String(process.env.SECRET_KEY);
