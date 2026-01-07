import { Request, Response } from "express";
import { urlRedirectServices } from "../services";

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const originalUrl = await urlRedirectServices.handleRedirect(shortCode);
    if (!originalUrl) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    return res.redirect(302, originalUrl);
  } catch (error) {
    console.error("Error during URL redirection:", error);
    return res.status(500).json({ message: "Redirection failed" });
  }
};
