import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConnection } from "../db";
import { IUser } from "../types";
import { generateUserObject } from "../utils";

const secret = process.env.JWT_SECRET!;

export async function handleEmailLogin(email: string, password: string) {
  const result = await dbConnection.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  const user = result.rows[0] as IUser;
  if (!user) {
    throw new Error("User not found");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }
  return generateUserObject(user);
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const payload = jwt.verify(refreshToken, secret) as any;
    const result = await dbConnection.query(
      "SELECT * FROM users WHERE id = $1",
      [payload.id]
    );
    const user = result.rows[0] as IUser;
    if (!user) {
      throw new Error("User not found");
    }
    return generateUserObject(user);
  } catch (err) {
    throw new Error("Unauthorized");
  }
}
