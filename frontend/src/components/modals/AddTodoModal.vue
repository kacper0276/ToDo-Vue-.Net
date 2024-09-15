<script setup lang="ts">
import { ref } from "vue";
import { ToDoGroup, type ToDoItem } from "@/types";
import { useToDo } from "@/composables/useToDo";

const { addToDoItem } = useToDo();

const props = defineProps<{
  show: boolean;
  groupId: number;
  onClose: () => void;
  onRefresh: () => Promise<void>;
}>();

const newToDo = ref<Omit<ToDoItem, "id">>({
  title: "",
  description: "",
  isComplete: false,
  toDoGroupId: props.groupId,
});

const addTodoItem = async () => {
  if (newToDo.value.title.trim()) {
    await addToDoItem(newToDo.value);
    newToDo.value = {
      title: "",
      description: "",
      isComplete: false,
      toDoGroupId: props.groupId,
    };
    await props.onRefresh();
    props.onClose();
  }
};

const closeModal = () => {
  props.onClose();
};
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h3>Dodaj nowe zadanie</h3>
      <input
        v-model="newToDo.title"
        type="text"
        placeholder="Tytuł zadania"
        class="todo-input"
      />
      <textarea
        v-model="newToDo.description"
        placeholder="Opis zadania"
        class="todo-textarea"
      ></textarea>
      <button @click="addTodoItem" class="add-button">Dodaj zadanie</button>
      <button @click="closeModal" class="close-button">Zamknij</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.todo-input,
.todo-textarea {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.todo-input {
  height: 40px;
}

.todo-textarea {
  height: 100px;
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
}

.add-button:hover {
  background-color: #36a56d;
}

.close-button {
  background-color: transparent;
  border: 1px solid #42b97c;
  color: #42b97c;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.close-button:hover {
  background-color: #42b97c;
  color: white;
}
</style>
