<script setup lang="ts">
import UserPanelNavigation from "@/components/nav/UserPanelNavigation.vue";
import ChangeUserDataForm from "@/components/forms/ChangeUserDataForm.vue";
import { setDocumentTitle } from "@/composables/setDocumentTitle";
import { markRaw, ref } from "vue";
import { useI18n } from "vue-i18n";

const { setTitle } = setDocumentTitle("user-panel");
setTitle("user-panel");

const { t } = useI18n();

const componentsMap: Record<string, any> = {
  ChangeUserDataForm: ChangeUserDataForm,
};

const currentPanel = ref<any>(null);

const handlePanelChange = (panelName: string) => {
  currentPanel.value = markRaw(componentsMap[panelName] || null);
};
</script>

<template>
  <div class="main-container">
    <UserPanelNavigation @panel-change="handlePanelChange" />
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
</style>
