import todoService from "@/services/todoService";
import type { ToDoItem } from "@/types";
import { inject, ref, type Ref } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";

export function useToDo() {
  const todos: Ref<ToDoItem[]> = ref([]);
  const todo: Ref<ToDoItem | null> = ref(null);
  const error: Ref<string | null> = ref(null);
  const { notify } = useNotification();
  const { t } = useI18n();

  const loading = inject("isLoading", ref(false));

  const fetchToDoItems = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await todoService.fetchToDoItems();
      todos.value = response;
      notify({
        type: "success",
        title: "Success",
        text: t("successfully-fetched-todo"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: "Error",
        text: t("failed-to-fetch-todo", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const addToDoItem = async (item: Omit<ToDoItem, "id">): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await todoService.addNewToDo(item);
      notify({
        type: "success",
        title: "Success",
        text: t("successfully-added-todo"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: "Error",
        text: t("failed-to-add-todo", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const toggleToDoStatus = async (id: number): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await todoService.toggleToDoStatus(id);
      notify({
        type: "success",
        title: "Success",
        text: t("successfully-toggled-todo"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: "Error",
        text: t("failed-to-toggle-todo", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const deleteToDoItem = async (id: number): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await todoService.deleteToDoItem(id);
      notify({
        type: "success",
        title: "Success",
        text: t("successfully-deleted-todo"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: "Error",
        text: t("failed-to-delete-todo", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const fetchToDoInGroupByGroupId = async (groupId: number): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await todoService.fetchToDoInGroupByGroupId(groupId);
      todos.value = response;
      notify({
        type: "success",
        title: "Success",
        text: t("successfully-fetched-todo"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: "Error",
        text: t("failed-to-fetch-todo", { error: error.value }),
      });
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
    fetchToDoInGroupByGroupId,
  };
}
