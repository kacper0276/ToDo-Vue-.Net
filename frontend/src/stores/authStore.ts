import { defineStore } from "pinia";
import type { User } from "@/types/Auth.type";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loggedIn = ref(false);
  const router = useRouter();

  const setUser = (userData: User | null) => {
    user.value = userData;
    loggedIn.value = !!userData;
    router.push("/");
  };

  const logout = () => {
    user.value = null;
    loggedIn.value = false;

    console.log("Test");

    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return {
    user,
    loggedIn,
    setUser,
    logout,
  };
});
