<template>
  <div class="main">
    <button class="add-task-button" v-if="isButtonVisible">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useToDo } from "@/composables/useToDo";
import { useToDoGroup } from "@/composables/useToDoGroup";
import { useAuthStore } from "@/stores/authStore";
import { useRoute } from "vue-router";
import { setDocumentTitle } from "@/composables/setDocumentTitle";

const { setTitle } = setDocumentTitle("user-to-do-group-details-page");
setTitle("user-to-do-group-details-page");

const { user } = useAuthStore();
const route = useRoute();
const id = Number(route.params.groupId);

const { fetchToDoInGroupByGroupId, todos } = useToDo();
const { groups, fetchUserToDoGroupsById } = useToDoGroup();

const isButtonVisible = computed(() => {
  return groups.value.some(
    (group) => group.id === id && group.userId === user?.id
  );
});

onMounted(async () => {
  await fetchToDoInGroupByGroupId(id);
  if (user?.id) {
    fetchUserToDoGroupsById(user.id);
  }
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
