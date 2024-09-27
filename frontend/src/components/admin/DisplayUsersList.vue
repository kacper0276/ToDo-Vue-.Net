<template>
  <div class="user-container">
    <UserCard
      v-for="user in users"
      :key="user.id"
      :user="user"
      @set-user="handleUser"
      class="user-card"
    ></UserCard>

    <div v-if="actualUser" class="overlay">
      <ChangeAdminDataForm :user="actualUser" @set-user="handleUser" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUser } from "@/composables/useUser";
import { onMounted, ref } from "vue";
import UserCard from "@/components/admin/UserCard.vue";
import type { User } from "@/types";
import ChangeAdminDataForm from "../forms/ChangeAdminDataForm.vue";

const { users, getAllUsers } = useUser();
const actualUser = ref<User | null>(null);

const handleUser = (user: User | null) => {
  actualUser.value = user;
};

onMounted(() => {
  getAllUsers();
});
</script>

<style scoped>
.user-container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}

.user-card {
  max-height: 200px;
  overflow: hidden;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
