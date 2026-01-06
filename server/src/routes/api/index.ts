import { Router } from "express";
import signupRoutes from "./signup";

const router = Router();
console.log("API ROUTER LOADED");

router.use("/auth", signupRoutes);

export default router;
