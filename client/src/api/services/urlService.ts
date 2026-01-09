import type { AxiosResponse } from "axios";
import { https } from "../../common/https";

interface UrlUsageResponse {
  used: number;
  remaining: number;
  limit: number;
}

interface CreateShortUrlResponse {
  shortUrl: string;
}

export const getUrlUsageService = async (): Promise<UrlUsageResponse> => {
  const response: AxiosResponse<UrlUsageResponse> = await https.get(
    "/api/url/usage"
  );

  return response.data;
};

export const createShortUrlService = async (
  url: string
): Promise<CreateShortUrlResponse> => {
  const response = await https.post("/api/url/shorten", {
    url,
  });

  return response.data;
};
