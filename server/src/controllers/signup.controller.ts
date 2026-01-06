import { Request, Response } from "express";
import { signupSchema } from "../validations";
import { signupServices } from "../services";

export const signupController = async (req: Request, res: Response) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const user = await signupServices.signupService(validatedData);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }
    if (error.message === "Email Exits") {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
