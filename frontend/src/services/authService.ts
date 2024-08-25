import type {
  User,
  LoginCredentials,
  RegisterCredentials,
} from "@/types/Auth.type";
import { jsonApiClient } from "@/api";

export default {
  async login(credentials: LoginCredentials): Promise<{ user: User }> {
    const response = await jsonApiClient.post(`/user/login`, credentials);
    const { user, token, refreshToken } = response.data;

    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("refreshToken", refreshToken);

    return { user };
  },

  async register(credentials: RegisterCredentials): Promise<{ user: User }> {
    const response = await jsonApiClient.post(`/user/register`, credentials);
    const { user } = response.data;

    return { user };
  },

  async logout(): Promise<void> {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
  },

  async getCurrentUser(): Promise<User> {
    const token = sessionStorage.getItem("authToken");
    if (!token) throw new Error("No token found");
    const response = await jsonApiClient.get(`/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  },
};
