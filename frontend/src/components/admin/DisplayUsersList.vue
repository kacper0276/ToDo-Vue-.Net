<template>
  <div class="user-container">
    <UserCard v-for="user in users" :key="user.id" :user="user"></UserCard>
  </div>
</template>

<script lang="ts" setup>
import { useUser } from "@/composables/useUser";
import { onMounted } from "vue";
import UserCard from "@/components/admin/UserCard.vue";

const { users, getAllUsers } = useUser();

onMounted(() => {
  getAllUsers();
});
</script>

<style scoped>
.user-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
}
</style>
