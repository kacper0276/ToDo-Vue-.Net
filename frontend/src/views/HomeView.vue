<script setup lang="ts">
import ToDoItemComponent from "@/components/ToDoItem.vue";
import AddTodoModal from "@/components/AddTodoModal.vue";
import { onMounted, ref } from "vue";
import type { ToDoItem } from "@/types/ToDoItem.type";
import { setDocumentTitle } from "@/composables/setDocumentTitle";
import { useToDo } from "@/composables/useToDo";

const { setTitle } = setDocumentTitle("home-page");
setTitle("home-page");

const { fetchToDoItems, todos } = useToDo();

onMounted(async () => {
  await fetchToDoItems();
});

const isModalVisible = ref(false);

const addToDoItem = (item: Omit<ToDoItem, "id">) => {
  console.log(item);
};

const showAddTodoModal = () => {
  isModalVisible.value = true;
};

const hideAddTodoModal = () => {
  isModalVisible.value = false;
};
</script>

<template>
  <main class="main-container">
    <button @click="showAddTodoModal" class="add-button">
      Dodaj nowe zadanie
    </button>
    <ToDoItemComponent
      v-for="item in todos"
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
