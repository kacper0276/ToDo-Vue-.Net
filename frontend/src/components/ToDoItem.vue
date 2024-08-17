<script setup lang="ts">
import { ref } from "vue";
import type { ToDoItem } from "@/types/ToDoItem.type";

const props = defineProps<{
  toDoItem: ToDoItem;
}>();

const isExpanded = ref(false);

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const toggleComplete = () => {
  props.toDoItem.completed = !props.toDoItem.completed;
};
</script>

<template>
  <div class="todo-container">
    <h3>{{ props.toDoItem.title }}</h3>
    <div class="status">
      <input
        type="checkbox"
        :checked="props.toDoItem.completed"
        @change="toggleComplete"
        class="status-checkbox"
      />
      <label>{{ props.toDoItem.completed ? "Gotowe" : "Niegotowe" }}</label>
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

h3 {
  color: #42b97c;
  margin: 0;
  font-size: 1.2em;
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
