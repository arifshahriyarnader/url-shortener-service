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

export interface LoginData {
  type: "email" | "refresh";
  email?: string;
  password?: string;
  refreshToken?: string | null;
}

export interface User {
  id: number;
  name: string | null;
  email: string;
  created_at: string;
}

export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}