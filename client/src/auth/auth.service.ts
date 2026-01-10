import type { AxiosResponse } from "axios";
import { https } from "../common/https";

export interface SignupInput {
  name?: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: number;
    name: string | null;
    email: string;
    created_at: string;
  };
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
