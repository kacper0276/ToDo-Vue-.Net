import { jsonApiClient } from "@/api";
import type { IServerResponseList } from "@/types";

import { ToDoItem } from "@/types";

export default {
  async fetchToDoItems(): Promise<ToDoItem[]> {
    const response = await jsonApiClient.get<IServerResponseList<ToDoItem>>(
      "/todo"
    );

    return response.data.items;
  },

  async fetchtoDoGroups() {},

  async addNewToDo(todo: Omit<ToDoItem, "id">): Promise<void> {
    try {
      await jsonApiClient.post<void>("/todo", todo);
    } catch (error) {
      console.error("Failed to add new ToDo item", error);
    }
  },

  async toggleToDoStatus(id: number): Promise<void> {
    try {
      await jsonApiClient.put(`/todo/${id}/toggle`);
    } catch (error) {
      console.error("Failed to toggle ToDo status", error);
      throw error;
    }
  },

  async deleteToDoItem(id: number): Promise<void> {
    try {
      await jsonApiClient.delete<void>(`/todo/${id}`);
    } catch (error) {
      console.error("Failed to delete ToDo item", error);
      throw error;
    }
  },

  async fetchToDoInGroupByGroupId(groupId: number): Promise<ToDoItem[]> {
    try {
      const response = await jsonApiClient.get<IServerResponseList<ToDoItem>>(
        `/todo-group/to-do-in-group/${groupId}`
      );

      return response.data.items;
    } catch (error) {
      console.error("Error");
      throw error;
    }
  },
};
