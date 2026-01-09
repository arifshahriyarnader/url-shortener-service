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

export const getUserUrls = async (
  userId: number,
  limit: number,
  offset: number
) => {
  const totalRes = await dbConnection.query(
    "SELECT COUNT(*) FROM urlstable WHERE user_id=$1",
    [userId]
  );
  const total = parseInt(totalRes.rows[0].count, 10);
  const urlsRes = await dbConnection.query(
    `SELECT id, original_url, short_code, user_id, click_count, created_at
     FROM urlstable
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );
  return {
    urls: urlsRes.rows,
    total,
    page: Math.floor(offset / limit) + 1,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const deleteUserUrl = async (userId: number, urlId: number) => {
  const urlRes = await dbConnection.query(
    "SELECT * FROM urlstable WHERE id = $1 AND user_id = $2",
    [urlId, userId]
  );
  if (urlRes.rows.length === 0) {
    throw new Error("URL not found or unauthorized");
  }
  await dbConnection.query("DELETE FROM urlstable WHERE id = $1", [urlId]);
  return { message: "URL deleted successfully" };
};

export const getUserUrlUsageStatus = async (userId: number) => {
  const result = await dbConnection.query(
    "SELECT COUNT(*) FROM urlstable WHERE user_id = $1",
    [userId]
  );
  const used = Number(result.rows[0].count);
  const limit = 100;
  return { used, remaining: Math.max(limit - used, 0), limit };
};
