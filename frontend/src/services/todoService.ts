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
};
