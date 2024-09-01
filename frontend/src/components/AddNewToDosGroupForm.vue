<template>
  <form @submit.prevent="handleSubmit" class="todo-group-form">
    <div class="input-group">
      <label for="name">{{ t("name") }}</label>
      <input type="text" id="name" v-model="form.name" required />
    </div>
    <div class="input-group">
      <label for="description">{{ t("description") }}</label>
      <input type="text" id="description" v-model="form.description" />
    </div>
    <div class="input-group">
      <label for="visible">{{ t("visible") }}</label>
      <input type="checkbox" id="visible" v-model="form.visible" />
    </div>
    <button type="submit" :disabled="loading">{{ t("submit") }}</button>
    <p v-if="message">{{ message }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToDoGroup } from "@/composables/useToDoGroup";
import { useAuthStore } from "@/stores/authStore";
import { useI18n } from "vue-i18n";
import { ToDoGroup } from "@/types/ToDoGroup.type";

const { addToDoGroup, loading } = useToDoGroup();
const { user } = useAuthStore();
const { t } = useI18n();

const form = ref<ToDoGroup>(new ToDoGroup(0, "", "", false));

const message = ref<string>("");

const handleSubmit = async () => {
  if (user === null) {
    message.value = t("user-not-authenticated");
    return;
  }

  if (user != null) {
    try {
      form.value.userId = user.id;
      await addToDoGroup(form.value);
      message.value = t("group-created-successfully");
      form.value = new ToDoGroup(0, "", "", false);
    } catch (err) {
      if (err instanceof Error) {
        message.value = `Error: ${err.message || t("error-occurred")}`;
      } else {
        message.value = t("error-occurred");
      }
    }
  }
};
</script>

<style scoped>
.todo-group-form {
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

.input-group input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgb(66, 184, 131);
  background-color: transparent;
  color: white;
  flex: 1;
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

p {
  color: red;
}
</style>
