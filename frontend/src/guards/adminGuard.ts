import { useAuthStore } from "@/stores/authStore";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const adminGuard = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();

  if (authStore.loggedIn && authStore.user?.role === "ADMIN") {
    next();
  } else {
    next("/");
  }
};
