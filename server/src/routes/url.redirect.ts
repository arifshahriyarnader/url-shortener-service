import { Router } from "express";
import { redirectToOriginalController } from "../controllers";

const router = Router();
router.get("/:shortCode", redirectToOriginalController.redirectToOriginalUrl);

export default router;
