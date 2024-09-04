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
      <label for="visible-switch">{{ t("visible") }}</label>
      <label class="visible-switch">
        <input
          type="checkbox"
          id="visible-switch"
          v-model="form.visible"
          class="slider-checkbox"
        />
        <span class="slider"></span>
      </label>
    </div>

    <button type="submit" :disabled="loading">{{ t("submit") }}</button>
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

const handleSubmit = async () => {
  if (user === null) {
    return;
  }

  if (user != null) {
    try {
      form.value.userId = user.id;
      await addToDoGroup(form.value);
      form.value = new ToDoGroup(0, "", "", false);
    } catch (err) {
      if (err instanceof Error) {
      } else {
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
  margin-bottom: 15px;
}

.input-group label {
  margin-bottom: 5px;
  color: rgb(66, 184, 131);
}

.input-group input[type="text"] {
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

.visible-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-top: 8px;
  cursor: pointer;
}

.visible-switch input[type="checkbox"] {
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  position: absolute;
  cursor: pointer;
  z-index: 2;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: grey;
  transition: 0.4s;
  border-radius: 20px;
  z-index: 1;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: rgb(66, 184, 131);
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style>
