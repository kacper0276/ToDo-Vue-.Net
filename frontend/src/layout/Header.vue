<template>
  <nav>
    <RouterLink to="/">{{ t("home") }}</RouterLink>
    <select v-model="selectedLang" @change="changeLanguage">
      <option value="en">English</option>
      <option value="pl">Polski</option>
    </select>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const { t, locale } = useI18n();

const selectedLang = ref(locale.value);

const changeLanguage = () => {
  locale.value = selectedLang.value;
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

a {
  color: rgb(66, 184, 131);
  text-decoration: none;
}

select {
  background-color: transparent;
  border: 1px solid rgb(66, 184, 131);
  border-radius: 4px;
  color: rgb(66, 184, 131);
  padding: 5px;
}
</style>
