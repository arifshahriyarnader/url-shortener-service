import { dbConnection } from "../db";
import { generateShortCode } from "../utils";

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
  const shortCode = await generateUniqueShortCode();
  const result = await dbConnection.query(
    `INSERT INTO urlstable (original_url, short_code, user_id)
     VALUES ($1, $2, $3)
     RETURNING short_code`,
    [originalUrl, shortCode, userId ?? null]
  );

  return result.rows[0].short_code;
};
