<template>
  <div class="main-container" ref="mainContainer">
    <UserToDoGroup
      v-for="group of groups"
      :show-change-visible-button="false"
      :show-edit-button="true"
      :todo-group="group"
      :show-delete-button="true"
      @change-actual-group="handleGroup"
    />

    <div class="overlay" v-if="actualGroup">
      <ChangeToDoGroupDataForm
        :to-do-group="actualGroup"
        @change-actual-group="handleGroup"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToDoGroup } from "@/composables/useToDoGroup";
import { onMounted, ref, watch } from "vue";
import UserToDoGroup from "../todoGroup/UserToDoGroup.vue";
import type { ToDoGroup } from "@/types";
import ChangeToDoGroupDataForm from "../todoGroup/ChangeToDoGroupDataForm.vue";

const { groups, fetchToDoGroups } = useToDoGroup();
const actualGroup = ref<ToDoGroup | null>(null);
const mainContainer = ref<HTMLElement | null>(null);

const handleGroup = (group: ToDoGroup | null) => {
  actualGroup.value = group;
};

const updateMainContainerOverflow = (isGroupActive: boolean) => {
  if (mainContainer.value) {
    mainContainer.value.style.overflow = isGroupActive ? "hidden" : "auto";
  }
};

onMounted(async () => {
  await fetchToDoGroups();
});

watch(actualGroup, (newVal) => {
  updateMainContainerOverflow(newVal !== null);
});
</script>

<style scoped>
.main-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.overlay form {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
</style>
