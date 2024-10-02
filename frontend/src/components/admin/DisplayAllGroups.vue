<template>
  <div class="main-container">
    <UserToDoGroup
      v-for="group of groups"
      :show-change-visible-button="false"
      :show-edit-button="true"
      :todo-group="group"
      @change-actual-group="handleGroup"
    />
  </div>
</template>

<script lang="ts" setup>
import { useToDoGroup } from "@/composables/useToDoGroup";
import { onMounted, ref } from "vue";
import UserToDoGroup from "../todoGroup/UserToDoGroup.vue";
import type { ToDoGroup } from "@/types";

const { groups, fetchToDoGroups } = useToDoGroup();
const actualGroup = ref<ToDoGroup | null>(null);

const handleGroup = (group: ToDoGroup) => {
  actualGroup.value = group;
};

onMounted(async () => {
  await fetchToDoGroups();
});
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
