import { defineStore } from "pinia";
import type { User } from "@/types/Auth.type";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { jsonApiClient } from "@/api";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loggedIn = ref(false);
  const router = useRouter();

  const setUser = (userData: User | null) => {
    user.value = userData;
    loggedIn.value = !!userData;

    if (userData) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  const logout = () => {
    user.value = null;
    loggedIn.value = false;

    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    router.push("/login");
  };

  const initializeAuth = async () => {
    const token = sessionStorage.getItem("authToken");

    if (token) {
      try {
        const response = await jsonApiClient.get<User>("user/me");

        setUser(response.data);
      } catch (err) {
        console.error("Błąd inicjalizacji autoryzacji:", err);
        logout();
      }
    }
  };

  return {
    user,
    loggedIn,
    setUser,
    logout,
    initializeAuth,
  };
});
