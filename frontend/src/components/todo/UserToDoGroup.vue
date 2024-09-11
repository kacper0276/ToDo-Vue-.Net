<template>
  <div class="todo-group">
    <p>{{ todoGroup?.name }}</p>
    <p>{{ t("number-of-tasks") }}: {{ todoGroup.toDoItems.length }}</p>
    <button class="details-button" @click="navigateToDetails">
      {{ t("see-details") }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ToDoGroup } from "@/types";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const { t } = useI18n();

const navigateToDetails = () => {
  if (props.todoGroup) {
    router.push(`/to-do-group/details/${props.todoGroup.id}`);
  }
};

const props = defineProps<{
  todoGroup: ToDoGroup;
}>();
</script>

<style scoped>
.todo-group {
  width: calc(25% - 20px);
  height: 300px;
  border: 1px solid #505050;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.details-button {
  background: rgb(66, 184, 131);
  border: none;
  padding: 10px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .todo-group {
    width: calc(50% - 20px);
  }
}
</style>
