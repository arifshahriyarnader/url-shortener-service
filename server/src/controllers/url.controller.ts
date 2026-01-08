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
      return res.status(403).json({
        message:
          "Free tier limit reached. Upgrade your plan to create more URLS.",
      });
    }
    console.error(error);
    res.status(500).json({ message: "Failed to shorten URL" });
  }
};

export const getUserUrlsController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * limit;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const result = await urlServices.getUserUrls(userId, limit, offset);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch URLs" });
  }
};

export const deleteUserUrlController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const urlId = parseInt(req.params.id);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const result = await urlServices.deleteUserUrl(userId, urlId);
    res.json(result);
  } catch (error: any) {
    console.error(error);
    if (
      error.message.includes("unauthorized") ||
      error.message.includes("not found")
    ) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to delete URL" });
  }
};

export const getUserUrlUsageStatusController = async(req: Request, res: Response) => {
  try{
    const userId = req.user?.id;
    const usage= await urlServices.getUserUrlUsageStatus(userId)
    res.json(usage);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: "Failed to fetch URL usage status" });
  }
}