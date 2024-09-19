// stores/themeStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDarkTheme = ref<boolean>(false);

  const currentTheme = computed(() =>
    isDarkTheme.value ? "dark-theme" : "light-theme"
  );

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
    localStorage.setItem("theme", isDarkTheme.value ? "dark" : "light");
    applyTheme();
  };

  const applyTheme = () => {
    document.documentElement.classList.toggle("dark-theme", isDarkTheme.value);
    document.documentElement.classList.toggle(
      "light-theme",
      !isDarkTheme.value
    );
  };

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    isDarkTheme.value = savedTheme === "dark";
    applyTheme();
  };

  initializeTheme();

  return {
    isDarkTheme,
    currentTheme,
    toggleTheme,
    initializeTheme,
  };
});
