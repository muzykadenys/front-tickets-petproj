export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  role: "user" | "admin";
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  passwordconf: string;
  image: string;
}
