import { inject, ref, type Ref } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";
import todoGroupService from "@/services/todoGroupService";
import type { ToDoGroup } from "@/types/ToDoGroup.type";

export function useToDoGroup() {
  const groups: Ref<ToDoGroup[]> = ref([]);
  const group: Ref<ToDoGroup | null> = ref(null);
  const error: Ref<string | null> = ref(null);
  const { notify } = useNotification();
  const { t } = useI18n();

  const loading = inject("isLoading", ref(false));

  const fetchToDoGroups = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await todoGroupService.fetchToDoGroups();
      groups.value = response;
      notify({
        type: "success",
        title: "Success",
        text: t("successfully-fetched-groups"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: "Error",
        text: t("failed-to-fetch-groups", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const fetchUserToDoGroups = async (userId: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await todoGroupService.fetchUserToDoGroup(userId);
      groups.value = response;
      notify({
        type: "success",
        title: "Success",
        text: t("successfully-fetched-groups"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: "Error",
        text: t("failed-to-fetch-groups", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const addToDoGroup = async (
    groupData: Omit<ToDoGroup, "id">
  ): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await todoGroupService.addNewToDoGroup(groupData);
      notify({
        type: "success",
        title: "Success",
        text: t("successfully-added-group"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: "Error",
        text: t("failed-to-add-group", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const deleteToDoGroup = async (id: number): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await todoGroupService.deleteToDoGroup(id);
      notify({
        type: "success",
        title: "Success",
        text: t("successfully-deleted-group"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: "Error",
        text: t("failed-to-delete-group", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    groups,
    group,
    loading,
    error,
    fetchToDoGroups,
    fetchUserToDoGroups,
    addToDoGroup,
    deleteToDoGroup,
  };
}
