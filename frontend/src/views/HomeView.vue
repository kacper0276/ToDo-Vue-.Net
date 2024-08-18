<script setup lang="ts">
import ToDoItemComponent from "@/components/ToDoItem.vue";
import AddTodoModal from "@/components/AddTodoModal.vue";
import { onMounted, ref } from "vue";
import { setDocumentTitle } from "@/composables/setDocumentTitle";
import { useToDo } from "@/composables/useToDo";
import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification();
const { setTitle } = setDocumentTitle("home-page");
setTitle("home-page");

const { fetchToDoItems, todos } = useToDo();

onMounted(async () => {
  await fetchToDoItems();
});

const isModalVisible = ref(false);

const showAddTodoModal = () => {
  isModalVisible.value = true;
};

const hideAddTodoModal = () => {
  isModalVisible.value = false;
};

onMounted(() => {
  notification.notify({
    title: "Zadania wczytane",
    text: "Pomyślnie wczytano listę zadań.",
    type: "success",
  });
});
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
      :onClose="hideAddTodoModal"
      :on-refresh="fetchToDoItems"
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
