import authService from "@/services/authService";
import type { User, LoginCredentials, RegisterCredentials } from "@/types";
import { ref, inject, type Ref } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/authStore";

export function useAuth() {
  const authStore = useAuthStore();
  const user: Ref<User | null> = ref(null);
  const error: Ref<string | null> = ref(null);
  const { notify } = useNotification();
  const { t } = useI18n();

  const loading = inject("isLoading", ref(false));

  const login = async (credentials: LoginCredentials): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await authService.login(credentials);
      authStore.setUser(response.user);
      user.value = response.user;
      notify({
        type: "success",
        title: t("success"),
        text: t("successfully-logged-in"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
        text: t("failed-to-login", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await authService.register(credentials);
      user.value = response.user;
      notify({
        type: "success",
        title: t("success"),
        text: t("successfully-registered"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
        text: t("failed-to-register", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const logout = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await authService.logout();
      authStore.setUser(null);
      user.value = null;
      notify({
        type: "success",
        title: t("success"),
        text: t("successfully-logged-out"),
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
        text: t("failed-to-logout", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  const getCurrentUser = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      user.value = await authService.getCurrentUser();
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      notify({
        type: "error",
        title: t("error"),
        text: t("failed-to-fetch-user", { error: error.value }),
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    error,
    loading,
    login,
    register,
    logout,
    getCurrentUser,
  };
}
