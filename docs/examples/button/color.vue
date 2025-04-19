<template>
  <div class="button-demo">
    <div class="button-row">
      <t-button color="#8a2be2">自定义颜色</t-button>
      <t-button color="#ff69b4">自定义颜色</t-button>
      <t-button color="#20b2aa">自定义颜色</t-button>
      <t-button color="#9370db">自定义颜色</t-button>
    </div>
  </div>
</template>

<script setup>
import { TButton } from "tune-ui";
</script>

<style scoped>
.button-demo {
  padding: 16px 0;
}
.button-row {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
