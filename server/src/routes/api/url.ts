import { Router } from "express";
import { shortenUrlController } from "../../controllers";
import { authenticateToken } from "../../middleware";

const router = Router();

router.post(
  "/shorten",
  authenticateToken,
  shortenUrlController.shortenUrlController
);

router.get(
  "/my-urls",
  authenticateToken,
  shortenUrlController.getUserUrlsController
);

router.delete("/my-urls/:id", authenticateToken, shortenUrlController.deleteUserUrlController);

export default router;
