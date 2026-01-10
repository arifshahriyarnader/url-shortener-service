import type { AxiosResponse } from "axios";
import { https } from "../common/https";
import type {
  AuthResponse,
  LoginData,
  SignupInput,
  SignupResponse,
} from "./authTypes";
import { appConfig } from "../common/config";

const saveAuthuser=(authUser:AuthResponse)=>{
    localStorage.setItem(appConfig.CURRENT_USER_KEY, JSON.stringify(authUser));
}

const getAuthUser = (): AuthResponse | null => {
  const storedUser = localStorage.getItem(appConfig.CURRENT_USER_KEY);
  if (!storedUser) return null;
  return JSON.parse(storedUser);
};

export const isUserLoggedIn = () => {
    return !!getAuthUser();
}

export const getAccessToken=() => {
    const authUser = getAuthUser();
    return authUser?.accessToken || null;
}

export const getRefreshToken=() => {
    const authUser = getAuthUser();
    return authUser?.refreshToken || null;
}

export const signupService = async (
  data: SignupInput
): Promise<SignupResponse> => {
  const response: AxiosResponse<SignupResponse> = await https.post(
    "/api/auth/signup",
    data
  );

  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await https.post(
    "/api/auth/login",
    data
  );
  saveAuthuser(response.data);
    return response.data;
  
};


export const logout = () => {
    localStorage.removeItem(appConfig.CURRENT_USER_KEY);
}