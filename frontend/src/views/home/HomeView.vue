<script setup lang="ts">
import { setDocumentTitle } from "@/composables/setDocumentTitle";
import { useI18n } from "vue-i18n";

const { setTitle } = setDocumentTitle("home-page");
setTitle("home-page");

const { t } = useI18n();
</script>

<template>
  <main class="main-container">
    <h1>{{ t("welcome-to-the-home-page") }}</h1>
  </main>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}
</style>
