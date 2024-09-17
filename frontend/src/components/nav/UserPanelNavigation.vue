<template>
  <nav class="navigation">
    <ul class="navigation-list">
      <li class="navigation-element" @click="changePanel('ChangeUserDataForm')">
        Change User Data
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const emit = defineEmits(["panel-change"]);

const changePanel = (panelName: string) => {
  console.log(panelName);

  emit("panel-change", panelName);
};
</script>

<style scoped>
.navigation {
  height: 100%;
  width: 30%;
}

.navigation-list {
  list-style-type: none;
  height: 100%;
  width: 100%;
}

.navigation-element {
  width: 100%;
  padding: 15px;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.navigation-element:hover {
  background: #282c30;
}
</style>
