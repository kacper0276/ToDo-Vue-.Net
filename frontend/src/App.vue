<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./layout/Header.vue";
import Layout from "./layout/Layout.vue";
import Footer from "./layout/Footer.vue";
</script>

<template>
  <Layout>
    <template #header>
      <Header />
    </template>
    <template #content>
      <RouterView />
    </template>
    <template #footer>
      <Footer />
    </template>
  </Layout>
</template>

<style scoped></style>
