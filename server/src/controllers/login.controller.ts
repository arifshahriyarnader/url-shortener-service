import { Request, Response } from "express";
import { LoginRequestBody } from "../types";
import { loginServices } from "../services";

export const loginController = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<void> => {
  const { type, email, password, refreshToken } = req.body;
  try {
    if (type === "email") {
      if (!email || !password) {
        res.status(400).json({ message: "Email and password required" });
        return;
      }
      const user = await loginServices.handleEmailLogin(email!, password!);
      res.json(user);
      return;
    }
    if (type === "refresh") {
      if (!refreshToken) {
        res.status(400).json({ message: "Refresh token required" });
        return;
      }
      const user = await loginServices.refreshAccessToken(refreshToken);
      res.json(user);
      return;
    }
    res.status(400).json({ message: "Invalid login type" });
  } catch (error: any) {
    if (error.message.includes("not found")) {
      res.status(404).json({ message: error.message });
    } else if (
      error.message.includes("Invalid") ||
      error.message.includes("Unauthorized")
    ) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
