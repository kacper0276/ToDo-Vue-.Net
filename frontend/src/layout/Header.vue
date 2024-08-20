<template>
  <nav>
    <RouterLink to="/" class="nav-link">{{ t("home") }}</RouterLink>
    <div>
      <select v-model="selectedLang" @change="changeLanguage">
        <option value="en">English</option>
        <option value="pl">Polski</option>
      </select>
      <label class="theme-switch">
        <input type="checkbox" v-model="isDarkTheme" @change="toggleTheme" />
        <span class="slider"></span>
      </label>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";

const { t, locale } = useI18n();

const selectedLang = ref(locale.value);
const isDarkTheme = ref(false);

const changeLanguage = () => {
  locale.value = selectedLang.value;
};

const toggleTheme = () => {
  document.documentElement.classList.toggle("dark-theme", isDarkTheme.value);
  localStorage.setItem("theme", isDarkTheme.value ? "dark" : "light");
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    isDarkTheme.value = true;
    document.documentElement.classList.add("dark-theme");
  } else {
    isDarkTheme.value = false;
    document.documentElement.classList.remove("dark-theme");
  }
});
</script>

<style scoped>
nav {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.nav-link {
  color: rgb(66, 184, 131);
  text-decoration: none;
  font-weight: bold;
  position: relative;
  transition: color 0.3s;
}

.nav-link:hover {
  color: rgb(36, 136, 83);
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 2px;
  width: 0;
  background: rgb(66, 184, 131);
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

div {
  display: flex;
  gap: 10px;
  align-items: center;
}

select {
  background-color: transparent;
  border: 1px solid rgb(66, 184, 131);
  border-radius: 4px;
  color: rgb(66, 184, 131);
  padding: 5px;
}

.theme-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.theme-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-border);
  transition: 0.4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: rgb(66, 184, 131);
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style>
