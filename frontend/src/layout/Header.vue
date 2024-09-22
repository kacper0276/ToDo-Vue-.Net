<template>
  <nav>
    <!-- Mobile Menu -->
    <div class="menu-container">
      <button
        class="menu-button"
        @click="toggleMenu"
        :class="{ 'menu-active': isMenuOpen }"
      >
        <span class="menu-icon"></span>
        <span class="menu-icon"></span>
        <span class="menu-icon"></span>
      </button>
      <div class="menu-overlay" :class="{ 'menu-active': isMenuOpen }">
        <div class="menu-content">
          <RouterLink to="/" class="nav-link" @click="closeMenu">{{
            t("home")
          }}</RouterLink>
          <template v-if="authStore.user">
            <button class="nav-link logout-button" @click="logoutFunc">
              {{ t("logout") }}
            </button>
          </template>
          <template v-else>
            <RouterLink to="/login" class="nav-link" @click="closeMenu">{{
              t("login")
            }}</RouterLink>
          </template>
          <RouterLink
            to="/create-todos-group"
            class="nav-link"
            @click="closeMenu"
            v-if="authStore.user"
            >{{ t("create-todos-group") }}</RouterLink
          >
          <RouterLink
            to="/your-todo-groups"
            class="nav-link"
            @click="closeMenu"
            v-if="authStore.user"
          >
            {{ t("your-groups") }}
          </RouterLink>
          <RouterLink
            to="/user-panel"
            class="nav-link"
            @click="closeMenu"
            v-if="authStore.user"
            >{{ t("user-panel") }}</RouterLink
          >
          <RouterLink
            to="/admin-panel"
            class="nav-link"
            @click="closeMenu"
            v-if="authStore.user?.role === 'ADMIN'"
            >{{ t("admin-panel") }}</RouterLink
          >
          <RouterLink
            :to="`/user-profile/${authStore.user?.login}`"
            class="nav-link"
            v-if="authStore.user"
            @click="closeMenu"
            >{{ t("user-profile") }}</RouterLink
          >
        </div>
      </div>
    </div>

    <!-- Desktop Menu -->
    <div class="desktop-menu">
      <RouterLink to="/" class="nav-link">{{ t("home") }}</RouterLink>
      <template v-if="authStore.user">
        <button class="nav-link logout-button" @click="logoutFunc">
          {{ t("logout") }}
        </button>
      </template>
      <template v-else>
        <RouterLink to="/login" class="nav-link">{{ t("login") }}</RouterLink>
      </template>
      <RouterLink
        to="/create-todos-group"
        class="nav-link"
        v-if="authStore.user"
        >{{ t("create-todos-group") }}</RouterLink
      >
      <RouterLink to="/your-todo-groups" class="nav-link" v-if="authStore.user">
        {{ t("your-groups") }}
      </RouterLink>
      <RouterLink to="/user-panel" class="nav-link" v-if="authStore.user">{{
        t("user-panel")
      }}</RouterLink>
      <RouterLink
        to="/admin-panel"
        class="nav-link"
        v-if="authStore.user?.role === 'ADMIN'"
        >{{ t("admin-panel") }}</RouterLink
      >
      <RouterLink
        :to="`/user-profile/${authStore.user?.login}`"
        class="nav-link"
        v-if="authStore.user"
        >{{ t("user-profile") }}</RouterLink
      >
    </div>

    <!-- Other Controls -->
    <div class="other-controls">
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
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useAuth } from "@/composables/useAuth";
import { useThemeStore } from "@/stores/themeStore";

const { t, locale } = useI18n();

const authStore = useAuthStore();
const { logout } = useAuth();

const themeStore = useThemeStore();
const isDarkTheme = computed(() => themeStore.isDarkTheme);

const selectedLang = ref(locale.value);
const isMenuOpen = ref(false);

const changeLanguage = () => {
  locale.value = selectedLang.value;
};

const toggleTheme = () => {
  themeStore.toggleTheme();
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const logoutFunc = () => {
  logout();
  closeMenu();
};
</script>

<style scoped>
nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;
  height: 100%;
}

/* Mobile Menu Styles */
.menu-container {
  display: none; /* Hide by default */
}

.menu-button {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 8px;
  position: relative;
  z-index: 20;
}

.menu-button .menu-icon {
  width: 30px;
  height: 3px;
  background: rgb(66, 184, 131);
  border-radius: 3px;
  transition: 0.3s;
}

.menu-button.menu-active .menu-icon:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-button.menu-active .menu-icon:nth-child(2) {
  opacity: 0;
}

.menu-button.menu-active .menu-icon:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.menu-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgb(33, 33, 33);
  color: white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 10;
  padding: 20px;
}

.menu-overlay.menu-active {
  transform: translateY(0);
}

.menu-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.nav-link {
  color: rgb(66, 184, 131);
  text-decoration: none;
  font-weight: bold;
  margin: 10px 0;
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

/* Desktop Menu Styles */
.desktop-menu {
  display: none; /* Hide by default */
  gap: 20px;
}

.desktop-menu .nav-link {
  margin: 0;
}

.logout-button {
  background: none;
  border: none;
  padding: 0;
  color: rgb(66, 184, 131);
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;
}

.logout-button:hover {
  color: rgb(36, 136, 83);
}

.logout-button:focus,
.logout-button:active {
  outline: none;
  box-shadow: none;
}

/* Media Queries */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .menu-container {
    display: flex;
  }
}

@media (min-width: 769px) {
  .menu-container {
    display: none;
  }

  .desktop-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}

.other-controls {
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
