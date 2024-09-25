import { jsonApiClient } from "@/api";
import type { IServerResponseList, IServerResponseSimple, User } from "@/types";

export default {
  async getAllUsers(): Promise<User[]> {
    const response = await jsonApiClient.get<IServerResponseList<User>>(
      "/user/"
    );

    return response.data.items;
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
