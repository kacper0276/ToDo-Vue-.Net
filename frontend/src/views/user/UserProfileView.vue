<template>
  <div class="main-container">
    <h1>{{ t("welcome") }} {{ username }}!</h1>
    <h2>Posty użytkownika:</h2>
    <div class="todo-group-container">
      <UserToDoGroup v-for="todoGroup in todoGroups" :todo-group="todoGroup" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import UserToDoGroup from "@/components/todo/UserToDoGroup.vue";
import { onMounted, ref } from "vue";
import type { ToDoGroup } from "@/types";
import todoGroupService from "@/services/todoGroupService";

const { t } = useI18n();

const route = useRoute();

const username = route.params.username as string;
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
