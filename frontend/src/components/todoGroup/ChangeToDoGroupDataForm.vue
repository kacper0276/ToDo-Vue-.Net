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
      <div class="input-group">
        <label for="name">name</label>
        <input type="text" id="name" v-model="form.name" />
      </div>
      <div class="input-group">
        <label for="description">description</label>
        <input type="text" id="description" v-model="form.description" />
      </div>

      <button @click="onSubmit">Zapisz zmiany</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useToDoGroup } from "@/composables/useToDoGroup";
import { ToDoGroup } from "@/types";
import { ref, watchEffect } from "vue";

const props = defineProps<{
  toDoGroup: ToDoGroup;
}>();

const emit = defineEmits(["change-actual-group"]);

const { changeGroupData } = useToDoGroup();

const closeForm = () => {
  emit("change-actual-group", null);
};

const form = ref<Pick<ToDoGroup, "id" | "name" | "description">>({
  id: props.toDoGroup.id!,
  name: props.toDoGroup.name!,
  description: props.toDoGroup.description!,
});

watchEffect(() => {
  if (props.toDoGroup) {
    form.value = {
      id: props.toDoGroup.id,
      name: props.toDoGroup.name,
      description: props.toDoGroup.description,
    };
  }
});

const onSubmit = async () => {
  await changeGroupData(form.value.id, form.value);
  closeForm();
};
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

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 5px;
  color: var(--label-color);
}

.input-group input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background-color: var(--input-background);
  color: var(--text-color);
}

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: var(--button-background);
  color: white;
  cursor: pointer;
  font-weight: bold;
  margin-top: 15px;
}

button:disabled {
  background-color: rgb(100, 100, 100);
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: var(--button-hover);
}
</style>
