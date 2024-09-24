<template>
  <div></div>
</template>

<script lang="ts" setup>
import { useUser } from "@/composables/useUser";
import { onMounted } from "vue";

const { users, getAllUsers } = useUser();

onMounted(() => {
  getAllUsers();
});
</script>

<style scoped></style>
