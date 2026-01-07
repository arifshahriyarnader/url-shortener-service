import { Router } from "express";
import { shortenUrlController } from "../../controllers";
import { authenticateToken } from "../../middleware";

const router = Router();

router.post(
  "/shorten",
  authenticateToken,
  shortenUrlController.shortenUrlController
);

export default router;
