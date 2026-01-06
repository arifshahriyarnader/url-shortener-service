import express from "express";
import { appConfig } from "./config";
import { connectDB } from "./db";
import apiRoutes from "./routes/api";

const app = express();

app.use(express.json());

connectDB();

app.use("/api", apiRoutes);

app.listen(appConfig.port, () => {
  console.log(`Server is running on port ${appConfig.port}`);
});
