<script setup lang="ts">
import { setDocumentTitle } from "@/composables/setDocumentTitle";
import { useAuthStore } from "@/stores/authStore";
import { useI18n } from "vue-i18n";

const { setTitle } = setDocumentTitle("user-panel");
setTitle("user-panel");

const { t } = useI18n();
const { user } = useAuthStore();
</script>

<template>
  <div class="main-container">
    <div class="navigation">
      <ul class="navigation-list">
        <li class="navigation-element">Zmień swoje dane</li>
      </ul>
    </div>
    <div class="panel-view">
      <h1>{{ t("user-panel") }}</h1>
      <h2>{{ user?.email }}</h2>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
}

.navigation {
  height: 100%;
  width: 30%;
}

.navigation-list {
  list-style-type: none;
  height: 100%;
  width: 100%;
}

.navigation-element {
  width: 100%;
  padding: 15px;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.navigation-element:hover {
  background: #282c30;
}

.panel-view {
  height: 100%;
  width: 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
