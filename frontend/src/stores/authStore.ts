import { defineStore } from "pinia";
import type { User } from "@/types/Auth.type";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loggedIn = ref(false);

  const setUser = (userData: User | null) => {
    user.value = userData;
    loggedIn.value = !!userData;
  };

  return {
    user,
    loggedIn,
    setUser,
  };
});
