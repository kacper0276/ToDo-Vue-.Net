<template>
  <div class="main">
    <button
      class="add-task-button"
      v-if="isButtonVisible"
      @click="showAddTodoModal"
    >
      +
    </button>

    <ToDoItemComponent
      v-for="item in todos"
      :key="item.id"
      :to-do-item="item"
      :on-refresh="fetchToDoGroups"
    />

    <AddTodoModal
      :show="isModalVisible"
      :group-id="id"
      :onClose="hideAddTodoModal"
      :on-refresh="fetchToDoGroups"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useToDo } from "@/composables/useToDo";
import { useToDoGroup } from "@/composables/useToDoGroup";
import { useAuthStore } from "@/stores/authStore";
import { useRoute } from "vue-router";
import { setDocumentTitle } from "@/composables/setDocumentTitle";
import AddTodoModal from "@/components/modals/AddTodoModal.vue";
import ToDoItemComponent from "@/components/todo/ToDoItem.vue";

const { setTitle } = setDocumentTitle("user-to-do-group-details-page");
setTitle("user-to-do-group-details-page");

const { user } = useAuthStore();
const route = useRoute();
const id = Number(route.params.groupId);

const { fetchToDoInGroupByGroupId, todos } = useToDo();
const { groups, fetchUserToDoGroupsById } = useToDoGroup();

const isModalVisible = ref(false);

const showAddTodoModal = () => {
  isModalVisible.value = true;
};

const hideAddTodoModal = () => {
  isModalVisible.value = false;
};

const isButtonVisible = computed(() => {
  return groups.value.some(
    (group) => group.id === id && group.userId === user?.id
  );
});

const fetchToDoGroups = async () => {
  await fetchToDoInGroupByGroupId(id);
};

onMounted(async () => {
  await fetchToDoInGroupByGroupId(id);
  if (user?.id) {
    fetchUserToDoGroupsById(user.id);
  }
});
</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
}

.add-task-button {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: #42b97c;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 15px;
  margin-right: 15px;
}
</style>
