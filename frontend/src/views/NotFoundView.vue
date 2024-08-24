<script setup lang="ts">
import { setDocumentTitle } from "@/composables/setDocumentTitle";
import { useI18n } from "vue-i18n";

const { setTitle } = setDocumentTitle("not-found-page");
const { t } = useI18n();
</script>

<template>
  <div class="main-view">
    <h1>404 - {{ t("not-found-page") }}</h1>
  </div>
</template>

<style scoped>
.main-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #1c1c1c;
  color: white;
}

.login-view h1 {
  margin-bottom: 20px;
  color: rgb(66, 184, 131);
}
</style>
