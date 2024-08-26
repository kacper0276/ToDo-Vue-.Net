import { jsonApiClient } from "@/api";
import type { IServerResponse } from "@/types/ServerResponse.type";
import { ToDoItem } from "@/types/ToDoItem.type";

export default {
  async fetchToDoItems(): Promise<ToDoItem[]> {
    const response = await jsonApiClient.get<IServerResponse>("/todo");

    return response.data.items;
  },

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
};
