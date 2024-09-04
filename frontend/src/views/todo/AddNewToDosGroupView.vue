<template>
  <div class="main-view">
    <h1>{{ t("create-new-todos-group") }}</h1>
    <AddNewToDosGroupForm />
  </div>
</template>

<script setup lang="ts">
import AddNewToDosGroupForm from "@/components/forms/AddNewToDosGroupForm.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
.main-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.main-view h1 {
  margin-bottom: 20px;
  color: rgb(66, 184, 131);
}
</style>
