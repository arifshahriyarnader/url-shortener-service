import express from "express";
import { appConfig } from "./config";
import { connectDB } from "./db";
import apiRoutes from "./routes/api";
import routes from "./routes";

const app = express();

app.use(express.json());

connectDB();

app.use("/api", apiRoutes);
app.use(routes)

app.listen(appConfig.port, () => {
  console.log(`Server is running on port ${appConfig.port}`);
});
