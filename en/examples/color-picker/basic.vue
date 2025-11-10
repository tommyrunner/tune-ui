<template>
  <div class="color-picker-demo">
    <t-color-picker v-model="color" />
    <div class="color-value">Currently selected color value: {{ color }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Default color value
const color = ref("#409EFF");
</script>

<style scoped>
.color-picker-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.color-value {
  font-size: 14px;
  color: #606266;
}
</style>
