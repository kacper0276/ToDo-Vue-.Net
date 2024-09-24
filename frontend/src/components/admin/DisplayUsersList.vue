<template>
  <div>
    <UserData v-for="user in users" :key="user.id" :user="user"></UserData>
  </div>
</template>

<script lang="ts" setup>
import { useUser } from "@/composables/useUser";
import { onMounted } from "vue";
import UserData from "@/components/admin/UserData.vue";

const { users, getAllUsers } = useUser();

onMounted(() => {
  getAllUsers();
});
</script>

<style scoped></style>
