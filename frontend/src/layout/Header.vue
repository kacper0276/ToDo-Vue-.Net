<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
nav {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  color: rgb(66, 184, 131);
}
</style>
