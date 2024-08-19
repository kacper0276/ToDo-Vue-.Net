<template>
  <div class="backdrop" v-if="visible">
    <svg class="loader" viewBox="0 0 50 50">
      <circle
        class="path outer"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
      <circle
        class="path inner"
        cx="25"
        cy="25"
        r="10"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean;
}>();
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  width: 48px;
  height: 48px;
  animation: rotate 2s linear infinite;

  .path {
    stroke-linecap: round;
  }

  .outer {
    stroke: #ff3d00;
    animation: dash 1.5s ease-in-out infinite;
  }

  .inner {
    stroke: #fff;
    animation: dash-reverse 3s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

@keyframes dash-reverse {
  0% {
    stroke-dasharray: 1, 60;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 40, 60;
    stroke-dashoffset: 15;
  }
  100% {
    stroke-dasharray: 40, 60;
    stroke-dashoffset: 124;
  }
}
</style>
