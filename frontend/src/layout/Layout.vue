<template>
  <div class="layout">
    <header class="header">
      <slot name="header"></slot>
    </header>
    <main class="main-container">
      <slot name="content"></slot>
    </main>
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}

.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  flex: 0 0 10%;
}

.main-container {
  flex: 1;
  overflow: auto;
}

.footer {
  flex: 0 0 10%;
}
</style>
