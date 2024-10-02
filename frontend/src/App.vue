<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./layout/Header.vue";
import Layout from "./layout/Layout.vue";
import Footer from "./layout/Footer.vue";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import ChatComponent from "@/components/chat/ChatComponent.vue";
import { onMounted, onUnmounted, provide, ref } from "vue";
import { useAuthStore } from "./stores/authStore";

const isLoading = ref(false);
const isChatVisible = ref(false);
const isOffline = ref(!navigator.onLine);
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

const handleConnectionChange = () => {
  isOffline.value = !navigator.onLine;
};

onMounted(() => {
  initializeAuth();
  window.addEventListener("online", handleConnectionChange);
  window.addEventListener("offline", handleConnectionChange);
});

onUnmounted(() => {
  window.removeEventListener("online", handleConnectionChange);
  window.removeEventListener("offline", handleConnectionChange);
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

  <div v-if="isOffline" class="offline-overlay">
    <p>
      Brak połączenia z siecią. Proszę sprawdzić swoje połączenie internetowe.
    </p>
  </div>
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

.offline-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  z-index: 1000;
}
</style>
