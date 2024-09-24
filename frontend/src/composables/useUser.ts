import userService from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";
import type { User } from "@/types";
import { useNotification } from "@kyvg/vue3-notification";
import { inject, ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useUser() {
  const authStore = useAuthStore();
  const user: Ref<User | null> = ref(null);
  const users: Ref<User[] | null> = ref(null);
  const error: Ref<string | null> = ref(null);
  const { notify } = useNotification();
  const { t } = useI18n();

  const loading = inject("isLoading", ref(false));

  const updateUser = async (updatedUser: Partial<User>): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await userService.changeUserData(updatedUser);
      authStore.setUser(response.user);
      user.value = response.user;
      notify({
        type: "success",
        title: t("success"),
        text: t("user-updated-successfully"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
        text: t("failed-to-update-user", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const getAllUsers = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await userService.getAllUsers();
      users.value = response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
        text: t("failed-to-fetch-all-users", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    users,
    error,
    loading,
    updateUser,
    getAllUsers,
  };
}
