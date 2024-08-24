<template>
  <div class="register-view">
    <h1>{{ t("register") }}</h1>
    <RegisterForm />
  </div>
</template>

<script setup lang="ts">
import RegisterForm from "@/components/RegisterForm.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
.register-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #1c1c1c;
  color: white;
}

.register-view h1 {
  margin-bottom: 20px;
  color: rgb(66, 184, 131);
}
</style>
