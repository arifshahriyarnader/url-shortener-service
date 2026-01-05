import { Pool } from "pg";
import { appConfig } from "../config/appConfig";

export const dbConnection = new Pool({
  connectionString: appConfig.databaseUrl,
});
