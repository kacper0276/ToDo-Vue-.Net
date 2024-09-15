<script setup lang="ts">
import { setDocumentTitle } from "@/composables/setDocumentTitle";

const { setTitle } = setDocumentTitle("admin-panel");
setTitle("admin-panel");
</script>

<template>
  <div>
    <h1>Admin panel</h1>
  </div>
</template>

<style scoped></style>
