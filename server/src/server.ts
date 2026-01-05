import express from "express";
import { appConfig } from "./config";
import { connectDB } from "./db";
const app = express();
app.use(express.json());

connectDB();

app.listen(appConfig.port, () => {
  console.log(`Server is running on port ${appConfig.port}`);
});
