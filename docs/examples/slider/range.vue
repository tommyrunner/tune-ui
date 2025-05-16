<template>
  <div class="demo-slider">
    <div class="slider-item">
      <p class="slider-label">基础范围选择</p>
      <t-slider v-model="value" range />
      <div class="value-display">当前值: {{ value }}</div>
    </div>

    <div class="slider-item">
      <p class="slider-label">带步长的范围选择</p>
      <t-slider v-model="stepValue" range :step="10" />
      <div class="value-display">当前值: {{ stepValue }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TSlider } from "tune-ui";

const value = ref([20, 60]);
const stepValue = ref([20, 80]);
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
