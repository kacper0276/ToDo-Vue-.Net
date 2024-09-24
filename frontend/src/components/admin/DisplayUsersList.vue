<template>
  <div>
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

<style scoped></style>
