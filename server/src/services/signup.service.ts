import bcrypt from "bcrypt";
import { dbConnection } from "../db";
import { CreateUserInput } from "../types";

export const signupService = async (userInput: CreateUserInput) => {
  const { name, email, password } = userInput;
  const existingUser = await dbConnection.query(
    "SELECT 1 FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await dbConnection.query(
    `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
    [name ?? null, email, hashedPassword]
  );
  return result.rows[0];
};
