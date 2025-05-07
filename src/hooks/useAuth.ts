import { useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axios";
import { AuthState, RegisterPayload, User } from "@/types/auth-type";
import { AxiosError } from "axios";

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: Cookies.get("accessToken") || null,
    isAuthenticated: !!Cookies.get("accessToken"),
    user: null,
    error: null,
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/login", {
        email,
        password,
      });

      const { token: accessToken, user } = response.data;

      Cookies.set("accessToken", accessToken, { expires: 2 / 24 });
      Cookies.set("userId", user.id, { expires: 2 / 24 });

      setAuthState({
        accessToken,
        isAuthenticated: true,
        user: null,
        error: null,
      });
    } catch {
      setAuthState((prev) => ({ ...prev, error: "Invalid credentials" }));
    }
  };

  const register = async (data: RegisterPayload) => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/register", data);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;

      setAuthState((prev) => ({
        ...prev,
        error: axiosError.response?.data?.message || "Registration failed",
      }));
    }
  };

  const getUser = async () => {
    const userId = Cookies.get("userId");

    if (!authState.accessToken || !userId) return;

    try {
      const response = await axiosInstance.get(`/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
        },
      });

      const user: User = response.data;

      setAuthState((prev) => ({
        ...prev,
        user,
      }));
    } catch {
      setAuthState((prev) => ({
        ...prev,
        error: "Failed to fetch user info",
        user: null,
      }));
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("userId");

    setAuthState({
      accessToken: null,
      isAuthenticated: false,
      user: null,
      error: null,
    });
  };

  return {
    authState,
    login,
    register,
    getUser,
    logout,
  };
};
