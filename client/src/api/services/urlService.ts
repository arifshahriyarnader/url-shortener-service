import type { AxiosResponse } from "axios";
import { https } from "../../common/https";
import type { UserUrl } from "../../types";

interface UrlUsageResponse {
  used: number;
  remaining: number;
  limit: number;
}

interface CreateShortUrlResponse {
  shortUrl: string;
}

interface UrlListResponse {
  urls: UserUrl[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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


export const getUserUrlsService = async (
  page = 1,
  limit = 10
): Promise<UrlListResponse> => {
  const res: AxiosResponse<UrlListResponse> = await https.get(
    `/api/url?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const deleteUserUrlService = async (urlId: number) => {
  await https.delete(`/api/url/${urlId}`);
};