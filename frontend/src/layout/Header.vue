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
  background: rebeccapurple;
}
</style>
