import todoService from "@/services/todoService";
import type { ToDoItem } from "@/types/ToDoItem.type";
import { ref, type Ref } from "vue";

export function useToDo() {
  const todos: Ref<ToDoItem[]> = ref([]);
  const todo: Ref<ToDoItem | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

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

  return {
    todos,
    todo,
    loading,
    error,
    fetchToDoItems,
  };
}
