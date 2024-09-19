<template>
  <form @submit.prevent="handleSubmit" class="user-form">
    <div class="input-group">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" required />
    </div>
    <div class="input-group">
      <label for="login">Login</label>
      <input type="text" id="login" v-model="form.login" required />
    </div>
    <!-- <div class="input-group">
      <label for="role">Rola</label>
      <select id="role" v-model="form.role" required>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="guest">Guest</option>
      </select>
    </div> -->
    <div class="input-group">
      <label for="password">Hasło</label>
      <input type="password" id="password" v-model="form.password" />
    </div>
    <div class="input-group" v-if="form.password">
      <label for="confirmPassword">Potwierdź hasło</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" />
    </div>
    <button type="submit" :disabled="loading">Zapisz zmiany</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import type { User } from "@/types";
import { useAuth } from "@/composables/useAuth";
import { useAuthStore } from "@/stores/authStore";

const { updateUser, loading } = useAuth();
const { user } = useAuthStore();

const form = ref<
  Pick<User, "email" | "login" | "role" | "id"> & { password?: string }
>({
  id: user?.id!,
  email: user?.email!,
  login: user?.login!,
  role: user?.role!,
  password: "",
});

const confirmPassword = ref<string>("");

watchEffect(() => {
  if (user) {
    form.value = {
      id: user.id,
      email: user.email,
      login: user.login,
      role: user.role,
      password: "",
    };
    confirmPassword.value = "";
  }
});

const handleSubmit = async () => {
  if (form.value.password && form.value.password !== confirmPassword.value) {
    alert("Hasła nie pasują do siebie!");
    return;
  }

  try {
    await updateUser(form.value);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.user-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--form-background);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 5px;
  color: var(--label-color);
}

.input-group input,
.input-group select {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background-color: var(--input-background);
  color: var(--text-color);
}

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: var(--button-background);
  color: white;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  background-color: rgb(100, 100, 100);
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: var(--button-hover);
}
</style>
