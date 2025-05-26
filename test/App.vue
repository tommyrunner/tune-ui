<template>
  <div style="height: 1000px; width: 100px">1</div>
  <div class="app-container">
    <TestHome />
  </div>
</template>

<script lang="ts" setup>
import TestHome from "./home.vue";
import "@/styles/index.scss";

defineOptions({ name: "App" });
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}

.app-container {
  width: 100%;
  min-height: 100vh;
}
</style>
