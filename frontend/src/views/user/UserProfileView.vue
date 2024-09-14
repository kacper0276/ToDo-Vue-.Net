<template>
  <div class="main-container">
    <h1>{{ t("username") }}: {{ username }}</h1>
    <h2>{{ t("user-posts") }}:</h2>
    <div class="todo-group-container">
      <UserToDoGroup v-for="todoGroup in groups" :todo-group="todoGroup" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import UserToDoGroup from "@/components/todo/UserToDoGroup.vue";
import { onMounted } from "vue";
import { useToDoGroup } from "@/composables/useToDoGroup";

const { t } = useI18n();

const route = useRoute();

const username = route.params.username as string;
const { fetchUserToDoGroupsByUsernameOnlyEnabled, groups } = useToDoGroup();

onMounted(async () => {
  await fetchUserToDoGroupsByUsernameOnlyEnabled(username);
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
