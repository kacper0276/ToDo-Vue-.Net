import axios, { type AxiosInstance } from "axios";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
} from "@/types/Auth.type";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5252/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  async login(credentials: LoginCredentials): Promise<{ user: User }> {
    const response = await apiClient.post(`/login`, credentials);
    const { user, token } = response.data;
    localStorage.setItem("authToken", token);
    return { user };
  },

  async register(credentials: RegisterCredentials): Promise<{ user: User }> {
    const response = await apiClient.post(`/user/register`, credentials);
    const { user, token } = response.data;
    console.log(response);

    // localStorage.setItem("authToken", token);
    return { user };
  },

  async logout(): Promise<void> {
    localStorage.removeItem("authToken");
  },

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found");
    const response = await apiClient.get(`/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  },
};
