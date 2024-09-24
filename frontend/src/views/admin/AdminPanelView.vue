<script setup lang="ts">
import DisplayUsersList from "@/components/admin/DisplayUsersList.vue";
import ChangeToDoGroupDataForm from "@/components/forms/ChangeToDoGroupDataForm.vue";
import AdminPanelNavigation from "@/components/nav/AdminPanelNavigation.vue";
import { setDocumentTitle } from "@/composables/setDocumentTitle";
import { markRaw, ref } from "vue";

const { setTitle } = setDocumentTitle("admin-panel");
setTitle("admin-panel");

const componentsMap: Record<string, any> = {
  DisplayUsersList: DisplayUsersList,
  ChangeToDoGroupDataForm: ChangeToDoGroupDataForm,
};

const currentPanel = ref<any>(null);

const handlePanelChange = (panelName: string) => {
  currentPanel.value = markRaw(componentsMap[panelName] || null);
};
</script>

<template>
  <div class="main-container">
    <AdminPanelNavigation @panel-change="handlePanelChange" />
    <div class="panel-view">
      <component :is="currentPanel" />
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
  justify-content: center;
  flex-direction: column;
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }

  .panel-view {
    width: 100%;
    padding: 20px;
  }
}
</style>
