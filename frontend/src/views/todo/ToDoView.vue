<script setup lang="ts">
import ToDoItemComponent from "@/components/todo/ToDoItem.vue";
import AddTodoModal from "@/components/modals/AddTodoModal.vue";
import { onMounted, ref } from "vue";
import { setDocumentTitle } from "@/composables/setDocumentTitle";
import { useToDo } from "@/composables/useToDo";
import { useI18n } from "vue-i18n";

const { setTitle } = setDocumentTitle("to-dos-page");
setTitle("to-dos-page");

const { t } = useI18n();

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
</script>

<template>
  <main class="main-container">
    <button @click="showAddTodoModal" class="add-button">
      {{ t("add-new-task") }}
    </button>
    <ToDoItemComponent
      v-for="item in todos"
      :key="item.id"
      :to-do-item="item"
      :on-refresh="fetchToDoItems"
    />
    <AddTodoModal
      :show="isModalVisible"
      :group-id="0"
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
