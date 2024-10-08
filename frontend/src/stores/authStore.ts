import { defineStore } from "pinia";
import type { User } from "@/types";
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

    if (!userData) {
      router.push("/login");
    }
  };

  const initializeAuth = async () => {
    const token = sessionStorage.getItem("authToken");

    if (token) {
      try {
        const response = await jsonApiClient.get<User>("user/me");

        setUser(response.data);
      } catch (err) {
        console.error("Błąd inicjalizacji autoryzacji:", err);
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("refreshToken");
      }
    }
  };

  return {
    user,
    loggedIn,
    setUser,
    initializeAuth,
  };
});
