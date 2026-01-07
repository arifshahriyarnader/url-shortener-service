import { Router } from "express";

import redirectRoutes from "./url.redirect";

const router = Router();

router.use("/", redirectRoutes);

export default router;
