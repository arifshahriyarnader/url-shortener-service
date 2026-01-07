import { Request, Response } from "express";

import { urlServices } from "../services";

export const shortenUrlController = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const shortCode = await urlServices.createShortUrl(url, req.user?.id);

    const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

    res.status(201).json({
      shortUrl,
    });
  } catch (error: any) {
    if (error.message === "URL limit reached for free account") {
      return res
        .status(403)
        .json({
          message:
            "Free tier limit reached. Upgrade your plan to create more URLS.",
        });
    }
    console.error(error);
    res.status(500).json({ message: "Failed to shorten URL" });
  }
};
