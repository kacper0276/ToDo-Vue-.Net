<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./layout/Header.vue";
import Layout from "./layout/Layout.vue";
import Footer from "./layout/Footer.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { provide, ref } from "vue";

const isLoading = ref(false);
provide("isLoading", isLoading);
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
  <notifications />
  <LoadingSpinner :visible="isLoading" />
</template>

<style scoped></style>
