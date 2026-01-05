import { dbConnection } from "./connection";

export const connectDB = async () => {
  try {
    await dbConnection.query("SELECT 1");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
