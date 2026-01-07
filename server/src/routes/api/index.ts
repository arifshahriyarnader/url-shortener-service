import { Router } from "express";
import signupRoutes from "./signup";
import loginRoutes from "./login";
import urlRoutes from "./url";

const router = Router();
console.log("API ROUTER LOADED");

router.use("/auth", signupRoutes);
router.use("/auth", loginRoutes);
router.use("/url", urlRoutes);

export default router;
