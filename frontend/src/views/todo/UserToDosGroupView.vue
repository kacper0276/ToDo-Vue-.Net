<template>
  <div class="main-container">
    <div class="todo-group-container">
      <UserToDoGroup v-for="todoGroup in groups" :todo-group="todoGroup" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserToDoGroup from "@/components/todo/UserToDoGroup.vue";
import { setDocumentTitle } from "@/composables/setDocumentTitle";
import { useToDoGroup } from "@/composables/useToDoGroup";
import { useAuthStore } from "@/stores/authStore";
import { onMounted } from "vue";

const { setTitle } = setDocumentTitle("user-to-dos-group-page");
setTitle("user-to-dos-group-page");

const authStore = useAuthStore();

const username = authStore.user?.login as string;
const { fetchUserToDoGroupsByUsername, groups } = useToDoGroup();

onMounted(async () => {
  await fetchUserToDoGroupsByUsername(username);
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
