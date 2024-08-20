import todoService from "@/services/todoService";
import type { ToDoItem } from "@/types/ToDoItem.type";
import { inject, ref, type Ref } from "vue";

export function useToDo() {
  const todos: Ref<ToDoItem[]> = ref([]);
  const todo: Ref<ToDoItem | null> = ref(null);
  const error: Ref<string | null> = ref(null);

  const loading = inject("isLoading", ref(false));

  const fetchToDoItems = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await todoService.fetchToDoItems();
      console.log(response);

      todos.value = response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
    } finally {
      loading.value = false;
    }
  };

  const addToDoItem = async (item: Omit<ToDoItem, "id">): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await todoService.addNewToDo(item);
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
    } finally {
      loading.value = false;
    }
  };

  const toggleToDoStatus = async (id: number): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await todoService.toggleToDoStatus(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
    } finally {
      loading.value = false;
    }
  };

  const deleteToDoItem = async (id: number): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await todoService.deleteToDoItem(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    todos,
    todo,
    loading,
    error,
    fetchToDoItems,
    addToDoItem,
    toggleToDoStatus,
    deleteToDoItem,
  };
}
