import dotenv from "dotenv";
dotenv.config();

export const appConfig = {
  port: process.env.PORT || 5001,
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  baseUrl: process.env.BASE_URL || "",
};
