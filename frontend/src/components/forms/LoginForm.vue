<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <div class="input-group">
      <label for="email">{{ t("email") }}</label>
      <input type="email" id="email" v-model="credentials.email" required />
    </div>
    <div class="input-group">
      <label for="password">{{ t("password") }}</label>
      <input
        type="password"
        id="password"
        v-model="credentials.password"
        required
      />
    </div>
    <button type="submit" :disabled="loading" class="login-button">
      {{ t("log-in") }}
    </button>
    <p class="register-text">
      {{ t("dont-have-an-account") }}?
      <button @click="goToRegister" class="register-button">
        {{ t("register") }}
      </button>
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import type { LoginCredentials } from "@/types";

const { login, loading } = useAuth();
const { t } = useI18n();
const router = useRouter();

const credentials = ref<LoginCredentials>({
  email: "",
  password: "",
});

const onSubmit = async () => {
  await login(credentials.value);
};

const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--form-background);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: white;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 5px;
  color: rgb(66, 184, 131);
}

.input-group input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgb(66, 184, 131);
  background-color: transparent;
  color: white;
}

.login-button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: rgb(66, 184, 131);
  color: white;
  cursor: pointer;
  font-weight: bold;
}

.login-button:disabled {
  background-color: rgb(100, 100, 100);
  cursor: not-allowed;
}

.login-button:hover:not(:disabled) {
  background-color: rgb(36, 136, 83);
}

.register-text {
  margin-top: 20px;
  text-align: center;
  color: white;
}

.register-text .register-button {
  background: none;
  border: none;
  color: rgb(66, 184, 131);
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
}

.register-text .register-button:hover {
  color: rgb(36, 136, 83);
}
</style>
