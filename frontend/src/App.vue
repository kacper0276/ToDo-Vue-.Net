<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./layout/Header.vue";
import Layout from "./layout/Layout.vue";
import Footer from "./layout/Footer.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ChatComponent from "@/components/ChatComponent.vue";
import { onMounted, provide, ref } from "vue";
import { useAuthStore } from "./stores/authStore";

const isLoading = ref(false);
const isChatVisible = ref(false);
const authStore = useAuthStore();

const showChat = () => {
  isChatVisible.value = true;
};

const closeChat = () => {
  isChatVisible.value = false;
};

provide("isLoading", isLoading);

const initializeAuth = async () => {
  isLoading.value = true;
  try {
    await authStore.initializeAuth();
  } catch (error) {
    console.error("Błąd inicjalizacji autoryzacji:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  initializeAuth();
});
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

  <button @click="showChat" class="chat-toggle-button">💬</button>

  <ChatComponent :show="isChatVisible" :onClose="closeChat" />
</template>

<style scoped>
.chat-toggle-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #42b97c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.chat-toggle-button:hover {
  background-color: #36a56d;
}
</style>
