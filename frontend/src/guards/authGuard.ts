import { useAuthStore } from "@/stores/authStore";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const authGuard = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();

  await authStore.initializeAuth();

  if (authStore.loggedIn) {
    next();
  } else {
    next("/login");
  }
};
