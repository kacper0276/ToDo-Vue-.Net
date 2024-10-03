<template>
  <div class="todo-group">
    <p>{{ todoGroup?.name }}</p>
    <p>{{ t("number-of-tasks") }}: {{ todoGroup.toDoItems.length }}</p>
    <button class="details-button" @click="navigateToDetails">
      {{ t("see-details") }}
    </button>

    <div class="visibility-container" v-if="props.showChangeVisibleButton">
      <p>{{ t("visibility") }}:</p>
      <label class="theme-switch">
        <input
          type="checkbox"
          v-model="props.todoGroup.visible"
          @change="changeVisibilityGroup"
        />
        <span class="slider"></span>
      </label>
    </div>

    <div
      class="edit-container"
      v-if="props.showEditButton"
      @click="changeActualGroup(props.todoGroup)"
    >
      <button class="details-button">Edycja</button>
    </div>

    <div class="edit-container" v-if="props.showDeleteButton">
      <button class="delete-button" @click="deleteToDoGroupFunc">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="heroicon-trash"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 3v1H4v2h16V4h-5V3a2 2 0 00-2-2H9a2 2 0 00-2 2v1zM4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToDoGroup } from "@/composables/useToDoGroup";
import { ToDoGroup } from "@/types";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const { changeGroupVisibility, deleteToDoGroup } = useToDoGroup();
const { t } = useI18n();
const emit = defineEmits(["change-actual-group"]);

const navigateToDetails = () => {
  if (props.todoGroup) {
    router.push({
      name: "todo-group-details",
      params: { groupId: props.todoGroup.id },
    });
  }
};

const changeVisibilityGroup = async () => {
  await changeGroupVisibility(props.todoGroup.id);
};

const changeActualGroup = (actualGroup: ToDoGroup) => {
  emit("change-actual-group", actualGroup);
};

const deleteToDoGroupFunc = async () => {
  await deleteToDoGroup(props.todoGroup.id);
};

const props = defineProps<{
  todoGroup: ToDoGroup;
  showChangeVisibleButton: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
}>();
</script>

<style scoped>
.todo-group {
  width: calc(25% - 20px);
  height: 300px;
  border: 1px solid #505050;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.details-button {
  background: rgb(66, 184, 131);
  border: none;
  padding: 10px;
  cursor: pointer;
}

.visibility-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

/* Checkbox for visibility */
.theme-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.theme-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-border);
  transition: 0.4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: rgb(66, 184, 131);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.edit-container {
  margin-top: 15px;
}

.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.delete-button svg {
  width: 20px;
  height: 20px;
  color: #42b97c;
  transition: color 0.3s ease;
}

.delete-button:hover svg {
  color: #42b97c;
}

@media (max-width: 768px) {
  .todo-group {
    width: calc(50% - 20px);
  }
}
</style>
