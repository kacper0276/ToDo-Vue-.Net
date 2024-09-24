<template>
  <div class="user-card">
    <div class="user-info">
      <h2 class="user-login">{{ user.login }}</h2>
      <p class="user-email">{{ user.email }}</p>
      <p class="user-role">Role: {{ user.role }}</p>
      <p class="user-groups">Number of groups: {{ user.toDoGroups.length }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "@/types";

defineProps<{ user: User }>();
</script>

<style scoped>
.user-card {
  background-color: var(--form-background);
  color: var(--text-color);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
  transition: background-color 0.3s, color 0.3s;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-login {
  font-size: 1.5rem;
  color: var(--primary-green);
}

.user-email {
  font-size: 1rem;
  color: var(--text-color);
}

.user-role,
.user-groups {
  font-size: 0.9rem;
  color: var(--text-color);
}

.user-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-color: var(--button-hover);
}
</style>
