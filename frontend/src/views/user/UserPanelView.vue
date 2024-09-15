<script setup lang="ts">
import { setDocumentTitle } from "@/composables/setDocumentTitle";

const { setTitle } = setDocumentTitle("user-panel");
setTitle("user-panel");
</script>

<template>
  <div>
    <h1>User panel</h1>
  </div>
</template>

<style scoped></style>
