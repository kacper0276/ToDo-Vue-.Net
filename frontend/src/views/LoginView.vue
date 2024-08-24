<template>
  <div class="login-view">
    <h1>{{ t("login") }}</h1>
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import { setDocumentTitle } from "@/composables/setDocumentTitle";
import { useI18n } from "vue-i18n";

const { setTitle } = setDocumentTitle("login-page");
setTitle("login-page");

const { t } = useI18n();
</script>

<style scoped>
.login-view {
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
