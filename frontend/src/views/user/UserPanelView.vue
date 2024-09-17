<script setup lang="ts">
import UserPanelNavigation from "@/components/nav/UserPanelNavigation.vue";
import ChangeUserDataForm from "@/components/forms/ChangeUserDataForm.vue";
import { setDocumentTitle } from "@/composables/setDocumentTitle";
import { ref, type DefineComponent } from "vue";
import { useI18n } from "vue-i18n";
import type { User } from "@/types";

const { setTitle } = setDocumentTitle("user-panel");
setTitle("user-panel");

const { t } = useI18n();

const componentsMap = {
  ChangeUserDataForm: ChangeUserDataForm,
};

const currentPanel = ref<DefineComponent<{}, {}, any> | null>(null);

const user: User = {
  id: 1,
  login: "John Doe",
  email: "john.doe@example.com",
  role: "user",
  toDoGroups: [],
};

const handlePanelChange = (panelName: string) => {
  // @ts-ignore
  currentPanel.value = componentsMap[panelName] || null;
};
</script>

<template>
  <div class="main-container">
    <UserPanelNavigation @panel-change="handlePanelChange" />
    <div class="panel-view">
      <component :is="currentPanel" :canChangeRole="false" :user="user" />
    </div>
  </div>
</template>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
}

.panel-view {
  height: 100%;
  width: 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
