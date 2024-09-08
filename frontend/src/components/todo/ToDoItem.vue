<script setup lang="ts">
import { ref } from "vue";
import type { ToDoItem } from "@/types";
import { useToDo } from "@/composables/useToDo";

const props = defineProps<{
  toDoItem: ToDoItem;
  onRefresh: () => Promise<void>;
}>();

const isExpanded = ref(false);
const { toggleToDoStatus, deleteToDoItem } = useToDo();

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const toggleComplete = async () => {
  try {
    await toggleToDoStatus(props.toDoItem.id);
    await props.onRefresh();
  } catch (err) {
    console.error("Failed to toggle task status", err);
  }
};

const removeToDoItem = async () => {
  try {
    await deleteToDoItem(props.toDoItem.id);
    await props.onRefresh();
  } catch (err) {
    console.error("Failed to delete task", err);
  }
};
</script>

<template>
  <div class="todo-container">
    <div class="header">
      <h3>{{ props.toDoItem.title }}</h3>
      <button
        @click="removeToDoItem"
        class="delete-button"
        title="Usuń zadanie"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="heroicon-trash"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 3v1H4v2h16V4h-5V3a2 2 0 00-2-2H9a2 2 0 00-2 2v1zM4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12"
          />
        </svg>
      </button>
    </div>
    <div class="status">
      <input
        type="checkbox"
        :checked="props.toDoItem.isComplete"
        @change="toggleComplete"
        class="status-checkbox"
      />
      <label>{{ props.toDoItem.isComplete ? "Gotowe" : "Niegotowe" }}</label>
    </div>
    <button @click="toggleExpand" class="toggle-button">
      {{ isExpanded ? "Zwiń" : "Rozwiń" }}
    </button>
    <transition name="expand-fade">
      <div v-if="isExpanded" class="description">
        <p>{{ props.toDoItem.description }}</p>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.todo-container {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f8f9fa;
  width: 25%;
  border-radius: 10px;
  margin-left: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  color: #42b97c;
  margin: 0;
  font-size: 1.2em;
}

.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.delete-button svg {
  width: 20px;
  height: 20px;
  color: #42b97c;
  transition: color 0.3s ease;
}

.delete-button:hover svg {
  color: #42b97c;
}

.status {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.status-checkbox {
  margin-right: 10px;
}

p {
  color: #42b97c;
}

label {
  color: #42b97c;
}

.description {
  margin-top: 10px;
  overflow: hidden;
  background-color: #e9f5e9;
  padding: 10px;
  border: 1px solid #d4e8d4;
  max-height: 500px;
}

.toggle-button {
  background-color: transparent;
  border: 1px solid #42b97c;
  color: #42b97c;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.toggle-button:hover {
  background-color: #42b97c;
  color: white;
}

.expand-fade-enter-active,
.expand-fade-leave-active {
  transition: max-height 0.5s ease, opacity 0.5s ease;
}

.expand-fade-enter,
.expand-fade-leave-to {
  max-height: 500px;
  opacity: 1;
}

.expand-fade-leave,
.expand-fade-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
