<template>
  <div class="demo-slider">
    <div class="slider-item">
      <p class="slider-label">基础滑块</p>
      <t-slider v-model="value" />
      <div class="value-display">当前值: {{ value }}</div>
    </div>

    <div class="slider-item">
      <p class="slider-label">禁用状态</p>
      <t-slider v-model="disabledValue" disabled />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const value = ref(50);
const disabledValue = ref(30);
</script>

<style scoped>
.demo-slider {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.slider-item {
  margin-bottom: 16px;
}

.slider-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 12px;
}

.value-display {
  margin-top: 12px;
  padding: 6px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}
</style>
