<script setup lang="ts">
import ToDoItemComponent from "@/components/ToDoItem.vue";
import AddTodoModal from "@/components/AddTodoModal.vue";
import { ref } from "vue";
import type { ToDoItem } from "@/types/ToDoItem.type";
import { setDocumentTitle } from "@/composables/setDocumentTitle";

const toDoItems = ref<ToDoItem[]>([
  {
    id: 1,
    title: "Przykładowe zadanie 1",
    description: "To jest przykładowy opis zadania 1.",
    completed: false,
  },
  {
    id: 2,
    title: "Przykładowe zadanie 2",
    description: "To jest przykładowy opis zadania 2.",
    completed: false,
  },
]);

const isModalVisible = ref(false);

const addToDoItem = (item: Omit<ToDoItem, "id">) => {
  const newId = toDoItems.value.length
    ? Math.max(...toDoItems.value.map((todo) => todo.id)) + 1
    : 1;
  toDoItems.value.push({
    id: newId,
    ...item,
  });
};

const showAddTodoModal = () => {
  isModalVisible.value = true;
};

const hideAddTodoModal = () => {
  isModalVisible.value = false;
};

const { setTitle } = setDocumentTitle("home-page");

setTitle("home-page");
</script>

<template>
  <main class="main-container">
    <button @click="showAddTodoModal" class="add-button">
      Dodaj nowe zadanie
    </button>
    <ToDoItemComponent
      v-for="item in toDoItems"
      :key="item.id"
      :to-do-item="item"
    />
    <AddTodoModal
      :show="isModalVisible"
      :onAdd="addToDoItem"
      :onClose="hideAddTodoModal"
    />
  </main>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}

.add-button {
  background-color: #42b97c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

.add-button:hover {
  background-color: #36a56d;
}
</style>
