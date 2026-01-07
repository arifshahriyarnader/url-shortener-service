import { dbConnection } from "../db";
import { generateShortCode } from "../utils";
import { MAX_FREE_URLS } from "../constants";

export const generateUniqueShortCode = async (): Promise<string> => {
  let code: string;
  let exists = true;
  while (exists) {
    code = generateShortCode();
    const result = await dbConnection.query(
      "SELECT 1 FROM urlstable WHERE short_code = $1",
      [code]
    );
    exists = result.rows.length > 0;
  }
  return code!;
};

export const createShortUrl = async (originalUrl: string, userId?: number) => {
  if (userId) {
    await checkUserUrlLimit(userId);
  }

  const shortCode = await generateUniqueShortCode();
  const result = await dbConnection.query(
    `INSERT INTO urlstable (original_url, short_code, user_id)
     VALUES ($1, $2, $3)
     RETURNING short_code`,
    [originalUrl, shortCode, userId ?? null]
  );

  return result.rows[0].short_code;
};

export const checkUserUrlLimit = async (userId: number) => {
  const result = await dbConnection.query(
    "SELECT COUNT(*) FROM urlstable WHERE user_id = $1",
    [userId]
  );
  const count = Number(result.rows[0].count);

  if (count >= MAX_FREE_URLS) {
    throw new Error("URL limit reached for free account");
  }
};
