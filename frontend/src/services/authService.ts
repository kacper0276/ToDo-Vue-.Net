import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  LoginResponse,
} from "@/types";
import { jsonApiClient } from "@/api";
import type { IServerResponseSimple } from "@/types";

export default {
  async login(credentials: LoginCredentials): Promise<{ user: User }> {
    const response = await jsonApiClient.post<
      IServerResponseSimple<LoginResponse>
    >(`/user/login`, credentials);
    const { user, token, refreshToken } = response.data.item;

    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("refreshToken", refreshToken);

    return { user };
  },

  async register(credentials: RegisterCredentials): Promise<{ user: User }> {
    const response = await jsonApiClient.post<IServerResponseSimple<User>>(
      `/user/register`,
      credentials
    );
    const user = response.data.item;

    return { user };
  },

  async logout(): Promise<void> {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
  },

  async getCurrentUser(): Promise<User> {
    const token = sessionStorage.getItem("authToken");
    if (!token) throw new Error("No token found");
    const response = await jsonApiClient.get(`/user/me`);
    return response.data.user;
  },

  async changeUserData(
    updatedUserData: Partial<User> & { password?: string }
  ): Promise<{ user: User }> {
    const token = sessionStorage.getItem("authToken");
    if (!token) throw new Error("No token found");

    const response = await jsonApiClient.put<IServerResponseSimple<User>>(
      `/user/${updatedUserData.id}`,
      updatedUserData
    );

    const user = response.data.item;

    return { user };
  },
};
