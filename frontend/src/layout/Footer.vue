<template>
  <template class="center-container">
    <p>{{ t("page-created-by") }}: <strong>Kacper Renkel</strong></p>
  </template>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

strong {
  color: rgb(66, 184, 131);
}
</style>
