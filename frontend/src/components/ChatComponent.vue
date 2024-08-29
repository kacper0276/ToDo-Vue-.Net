<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from "vue";
import WebSocketService from "@/services/WebSocketService";

const props = defineProps<{
  show: boolean;
  onClose: () => void;
}>();

const wsService = new WebSocketService("ws://localhost:5252/ws");

const messages = ref<string[]>([]);
const inputMessage = ref<string>("");
const statusMessage = ref<string>("");

const connectWebSocket = () => {
  statusMessage.value = "Connecting...";

  if (wsService) {
    wsService.connect();

    wsService.setMessageHandler((message) => {
      console.log("Message from server:", message);
      messages.value.push(`Server: ${message}`);
    });

    wsService.setErrorHandler((error) => {
      console.error("WebSocket error:", error);
      statusMessage.value = "Error: Unable to connect.";
    });

    wsService.setCloseHandler((event) => {
      console.log("WebSocket connection closed:", event);
      statusMessage.value = "WebSocket connection closed.";
    });

    // Assuming you have a way to determine when the WebSocket is ready
    wsService.setOpenHandler(() => {
      statusMessage.value = "Connected.";
    });
  }
};

const disconnectWebSocket = () => {
  if (wsService) {
    wsService.disconnect();
    statusMessage.value = "Disconnecting...";
  }
};

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      connectWebSocket();
    } else {
      disconnectWebSocket();
    }
  }
);

onBeforeUnmount(() => {
  disconnectWebSocket();
});

const sendMessage = () => {
  if (inputMessage.value.trim() === "") return;
  wsService.sendMessage(inputMessage.value);
  messages.value.push(`You: ${inputMessage.value}`);
  inputMessage.value = "";
};

const closeChat = () => {
  disconnectWebSocket();
  props.onClose();
};
</script>

<template>
  <div v-if="show" class="chat-modal">
    <div class="chat-header">
      <h3>Live Chat</h3>
      <button @click="closeChat" class="close-button">X</button>
    </div>
    <div class="chat-body">
      <ul class="message-list">
        <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
      </ul>
    </div>
    <div class="chat-footer">
      <input
        type="text"
        v-model="inputMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
        class="message-input"
      />
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
    <div class="status">
      <p>{{ statusMessage }}</p>
    </div>
  </div>
</template>
<style scoped>
* {
  color: #000;
}

.chat-modal {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 300px;
  height: 400px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 10px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-body {
  padding: 10px;
  flex-grow: 1;
  overflow-y: auto;
}

.message-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chat-footer {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.message-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
}

.send-button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0056b3;
}

.close-button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: #575757;
}
</style>
