<template>
  <div>
    <button v-if="!isMenuOpen && isMobile" @click="toggleMenu" class="menu-btn">
      &#9776;
    </button>

    <nav
      :class="['navigation', { 'navigation-open': isMenuOpen || !isMobile }]"
    >
      <button
        v-if="isMenuOpen && isMobile"
        @click="toggleMenu"
        class="close-btn"
      >
        &times;
      </button>
      <ul class="navigation-list">
        <li class="navigation-element" @click="changePanel('DisplayUsersList')">
          Display Users List
        </li>
        <li
          class="navigation-element"
          @click="changePanel('ChangeToDoGroupDataForm')"
        >
          Change todo
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const emit = defineEmits(["panel-change"]);
const isMenuOpen = ref(false);
const isMobile = ref(false);

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener("resize", checkIfMobile);
});

const changePanel = (panelName: string) => {
  emit("panel-change", panelName);
  if (isMobile.value) isMenuOpen.value = false;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
.menu-btn {
  font-size: 30px;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
}

.navigation {
  height: 100%;
  width: 0;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: width 0.3s ease;
  z-index: 1000;
}

.navigation-open {
  width: 250px;
}

@media (min-width: 768px) {
  .navigation {
    width: 250px;
    position: relative;
    z-index: 0;
  }
}

.close-btn {
  font-size: 36px;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1002;
}

@media (min-width: 768px) {
  .menu-btn {
    display: none;
  }

  .close-btn {
    display: none;
  }
}

.navigation-list {
  list-style-type: none;
  padding: 0;
  margin-top: 60px;
  background: var(--main-background);
}

.navigation-element {
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: rgb(66, 184, 131);
}

.navigation-element:hover {
  background-color: #282c30;
}
</style>
