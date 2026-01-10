import axios from "axios";
import { appConfig } from "../config";
import { authService } from "../../auth";

const https = axios.create({
  baseURL: appConfig.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

https.interceptors.request.use(
  (config) => {
    const accessToken = authService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

https.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Session expired");
    if (error.response.status === 401 && !error.config._retry) {
      const refreshToken = authService.getRefreshToken();
      if (!refreshToken) {
        window.location.replace("/login");
      }
      const { accessToken } = await authService.login({
        type: "refresh",
        refreshToken,
      });
      if (!accessToken) {
        window.location.replace("/login");
      }
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return axios(error.config);
    }
  }
);

export { https };
