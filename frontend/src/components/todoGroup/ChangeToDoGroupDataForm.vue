<template>
  <div class="form-container">
    <button class="back-button" @click="closeForm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="white"
        class="bi bi-arrow-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
        />
      </svg>
    </button>

    <form class="change-data-form">
      <input type="text" />
      <input type="text" />
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { ToDoGroup } from "@/types";

const emit = defineEmits(["change-actual-group"]);

const closeForm = () => {
  emit("change-actual-group", null);
};

const props = defineProps<{
  toDoGroup: ToDoGroup;
}>();
</script>

<style scoped>
.form-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button {
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
  outline: none;
  cursor: pointer;
  background: none;
  border: none;
}

.change-data-form {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
}
</style>
