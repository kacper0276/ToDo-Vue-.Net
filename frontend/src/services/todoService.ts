import type { IServerResponse } from "@/types/ServerResponse.type";
import { ToDoItem } from "@/types/ToDoItem.type";
import type { AxiosInstance } from "axios";
import axios from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5252/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  async fetchToDoItems(): Promise<ToDoItem[]> {
    const response = await apiClient.get<IServerResponse>("/todo");

    return response.data.items;
  },

  async addNewToDo(todo: Omit<ToDoItem, "id">): Promise<void> {
    try {
      console.log(todo);
      await apiClient.post<void>("/todo", todo);
    } catch (error) {
      console.error("Failed to add new ToDo item", error);
    }
  },

  async toggleToDoStatus(id: number): Promise<void> {
    try {
      await apiClient.put(`/todo/${id}/toggle`);
    } catch (error) {
      console.error("Failed to toggle ToDo status", error);
      throw error;
    }
  },

  async deleteToDoItem(id: number): Promise<void> {
    try {
      await apiClient.delete<void>(`/todo/${id}`);
    } catch (error) {
      console.error("Failed to delete ToDo item", error);
      throw error;
    }
  },
};
