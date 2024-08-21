import axios, { type AxiosInstance } from "axios";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
} from "@/types/Auth.type";

const API_URL: AxiosInstance = axios.create({
  baseURL: "http://localhost:5252/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  async login(credentials: LoginCredentials): Promise<{ user: User }> {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { user, token } = response.data;
    localStorage.setItem("authToken", token);
    return { user };
  },

  async register(credentials: RegisterCredentials): Promise<{ user: User }> {
    const response = await axios.post(`${API_URL}/register`, credentials);
    const { user, token } = response.data;
    localStorage.setItem("authToken", token);
    return { user };
  },

  async logout(): Promise<void> {
    localStorage.removeItem("authToken");
  },

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found");
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  },
};
