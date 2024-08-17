<script setup lang="ts">
import { setDocumentTitle } from "../composables/setDocumentTitle";

const { setTitle } = setDocumentTitle("home-page");

setTitle("home-page");
</script>

<template>
  <main>
    <p>Strona główna</p>
  </main>
</template>
