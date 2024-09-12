<template>
  <div>
    <button class="add-task-button">+</button>
  </div>
</template>

<script setup lang="ts">
import { useToDo } from "@/composables/useToDo";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.groupId as string;

const { fetchToDoInGroupByGroupId, todos } = useToDo();

onMounted(async () => {
  await fetchToDoInGroupByGroupId(+id);
});
</script>

<style scoped>
.add-task-button {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: #42b97c;
}
</style>
