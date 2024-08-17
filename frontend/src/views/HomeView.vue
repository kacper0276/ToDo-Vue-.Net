<script setup lang="ts">
import ToDoItem from "@/components/ToDoItem.vue";
import { setDocumentTitle } from "../composables/setDocumentTitle";
import { ref } from "vue";

const { setTitle } = setDocumentTitle("home-page");

setTitle("home-page");

const toDoItem = ref({
  id: 1,
  title: "Przykładowe zadanie",
  description: "To jest przykładowy opis zadania.",
  completed: false,
});
</script>

<template>
  <main class="main-container">
    <ToDoItem :to-do-item="toDoItem" />
    <ToDoItem :to-do-item="toDoItem" />
    <ToDoItem :to-do-item="toDoItem" />
    <ToDoItem :to-do-item="toDoItem" />
    <ToDoItem :to-do-item="toDoItem" />
    <ToDoItem :to-do-item="toDoItem" />
  </main>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
