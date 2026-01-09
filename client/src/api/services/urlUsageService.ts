import type { AxiosResponse } from "axios";
import { https } from "../../common/https";

interface UrlUsageResponse {
  used: number;
  remaining: number;
  limit: number;
}

export const getUrlUsageService = async (): Promise<UrlUsageResponse> => {
  const response: AxiosResponse<UrlUsageResponse> = await https.get(
    "/api/client/url-usage"
  );

  return response.data;
};
