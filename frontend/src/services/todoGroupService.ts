import { jsonApiClient } from "@/api";
import type { IServerResponse } from "@/types/ServerResponse.type";
import { ToDoGroup } from "@/types/ToDoGroup.type";

export default {
  async fetchToDoGroups(): Promise<ToDoGroup[]> {
    try {
      const response = await jsonApiClient.get<IServerResponse>("/todo-group");
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

  async fetchUserToDoGroup(userId: string): Promise<ToDoGroup[]> {
    try {
      const resopnse = await jsonApiClient.get<IServerResponse>(
        `/todo-group/${userId}`
      );
      return resopnse.data.items;
    } catch (error) {
      console.error("Failed to fetch user toDo group", error);
      throw error;
    }
  },
};
