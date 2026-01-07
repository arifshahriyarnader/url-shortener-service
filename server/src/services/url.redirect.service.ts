import { dbConnection } from "../db";

export const handleRedirect = async (
  shortCode: string
): Promise<string | null> => {
  const result = await dbConnection.query(
    `
    UPDATE urlstable
    SET click_count = click_count + 1
    WHERE short_code = $1
    RETURNING original_url
    `,
    [shortCode]
  );
  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0].original_url;
};
