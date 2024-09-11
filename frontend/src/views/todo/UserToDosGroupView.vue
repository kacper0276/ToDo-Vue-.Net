<template>
  <div class="main-container">
    <div class="todo-group-container">
      <UserToDoGroup v-for="todoGroup in todoGroups" :todo-group="todoGroup" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserToDoGroup from "@/components/todo/UserToDoGroup.vue";
import todoGroupService from "@/services/todoGroupService";
import { useAuthStore } from "@/stores/authStore";
import type { ToDoGroup } from "@/types";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();

const username = authStore.user?.login as string;
const todoGroups = ref<ToDoGroup[]>([]);

onMounted(() => {
  todoGroupService
    .fetchUserToDoGroupsByUsername(username)
    .then((res: ToDoGroup[]) => {
      todoGroups.value = res;
    });
});
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-group-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
