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
    <div class="input-group" v-if="canChangeRole">
      <label for="role">Rola</label>
      <select id="role" v-model="form.role" required>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="guest">Guest</option>
      </select>
    </div>
    <button type="submit" :disabled="loading">Zapisz zmiany</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from "vue";
import type { User } from "@/types";
import { useAuth } from "@/composables/useAuth";

const props = defineProps<{
  user: User;
  canChangeRole: boolean;
}>();

const { updateUser, loading } = useAuth();
const form = ref<
  Pick<User, "email" | "login" | "role" | "id"> & { password?: string }
>({
  id: props.user.id,
  email: props.user.email,
  login: props.user.login,
  role: props.user.role,
  password: "",
});

watch(
  () => props.user,
  (newUser) => {
    form.value = { ...newUser };
  },
  { immediate: true }
);

const handleSubmit = async () => {
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
  background-color: #212121;
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

.input-group input,
.input-group select {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgb(66, 184, 131);
  background-color: transparent;
  color: white;
}

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: rgb(66, 184, 131);
  color: white;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  background-color: rgb(100, 100, 100);
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: rgb(36, 136, 83);
}
</style>
