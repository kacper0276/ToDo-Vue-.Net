import { jsonApiClient } from "@/api";
import { type IServerResponseList } from "@/types";
import type { IServerResponsePaginated } from "@/types";
import { ToDoGroup } from "@/types";

export default {
  async fetchToDoGroups(): Promise<ToDoGroup[]> {
    try {
      const response = await jsonApiClient.get<
        IServerResponsePaginated<ToDoGroup>
      >("/todo-group");
      return response.data.items;
    } catch (error) {
      console.error("Failed to fetch ToDo groups", error);
      throw error;
    }
  },

  async addNewToDoGroup(groupData: Omit<ToDoGroup, "id">): Promise<void> {
    try {
      await jsonApiClient.post<void>("/todo-group", groupData);
    } catch (error) {
      console.error("Failed to add new ToDo group", error);
      throw error;
    }
  },

  async deleteToDoGroup(id: number): Promise<void> {
    try {
      await jsonApiClient.delete<void>(`/todo-group/${id}`);
    } catch (error) {
      console.error("Failed to delete ToDo group", error);
      throw error;
    }
  },

  async fetchUserToDoGroupByUserId(userId: number): Promise<ToDoGroup[]> {
    try {
      const resopnse = await jsonApiClient.get<IServerResponseList<ToDoGroup>>(
        `/todo-group/by-user-id/${userId}`
      );
      return resopnse.data.items;
    } catch (error) {
      console.error("Failed to fetch user toDo group", error);
      throw error;
    }
  },

  async fetchUserToDoGroupsByUsername(username: string): Promise<ToDoGroup[]> {
    try {
      const response = await jsonApiClient.get<IServerResponseList<ToDoGroup>>(
        `/todo-group/by-login/${username}`
      );

      return response.data.items;
    } catch (error) {
      console.error("Error");
      throw error;
    }
  },

  async fetchUserToDoGroupsByUsernameOnlyEnabled(
    username: string
  ): Promise<ToDoGroup[]> {
    try {
      const response = await jsonApiClient.get<IServerResponseList<ToDoGroup>>(
        `/todo-group/by-login-only-enabled/${username}`
      );

      return response.data.items;
    } catch (error) {
      console.error("Error");
      throw error;
    }
  },

  async changeGroupVisibility(groupId: number): Promise<void> {
    try {
      await jsonApiClient.patch<void>(
        `/todo-group/change-visibility/${groupId}`
      );
    } catch (error) {
      console.log("Error");
      throw error;
    }
  },
};
