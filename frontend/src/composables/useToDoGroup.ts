import { inject, ref, type Ref } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";
import todoGroupService from "@/services/todoGroupService";
import type { ToDoGroup } from "@/types";

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
        title: t("success"),
        text: t("successfully-fetched-groups"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
        text: t("failed-to-fetch-groups", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const fetchUserToDoGroupsById = async (userId: number): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await todoGroupService.fetchUserToDoGroupByUserId(
        userId
      );
      groups.value = response;
      notify({
        type: "success",
        title: t("success"),
        text: t("successfully-fetched-groups"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
        text: t("failed-to-fetch-groups", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const fetchUserToDoGroupsByUsername = async (
    username: string
  ): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await todoGroupService.fetchUserToDoGroupsByUsername(
        username
      );
      groups.value = response;
      notify({
        type: "success",
        title: t("success"),
        text: t("successfully-fetched-groups"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
        text: t("failed-to-fetch-groups", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const fetchUserToDoGroupsByUsernameOnlyEnabled = async (
    username: string
  ): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response =
        await todoGroupService.fetchUserToDoGroupsByUsernameOnlyEnabled(
          username
        );
      groups.value = response;
      notify({
        type: "success",
        title: t("success"),
        text: t("successfully-fetched-groups"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
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
        title: t("success"),
        text: t("successfully-added-group"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
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
        title: t("success"),
        text: t("successfully-deleted-group"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
        text: t("failed-to-delete-group", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const changeGroupVisibility = async (groupId: number): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      await todoGroupService.changeGroupVisibility(groupId);
      notify({
        type: "success",
        title: t("success"),
        text: t("successfully-change-group-visibility"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
        text: t("failed-to-change-group-visibility", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const changeGroupData = async (
    groupId: number,
    toDoGroup: Partial<ToDoGroup>
  ): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      await todoGroupService.changeGroupData(groupId, toDoGroup);
      notify({
        type: "success",
        title: t("success"),
        text: t("successfully-change-group-visibility"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
        text: t("failed-to-change-group-visibility", { error: error.value }),
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
    fetchUserToDoGroupsById,
    fetchUserToDoGroupsByUsername,
    fetchUserToDoGroupsByUsernameOnlyEnabled,
    addToDoGroup,
    deleteToDoGroup,
    changeGroupVisibility,
    changeGroupData,
  };
}
