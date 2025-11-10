<template>
  <div class="demo-slider">
    <div class="slider-item">
      <p class="slider-label">Show Stops (Step 10)</p>
      <t-slider v-model="value" :step="10" show-stops />
      <div class="value-display">Current value: {{ value }}</div>
    </div>

    <div class="slider-item">
      <p class="slider-label">Show Stops (Step 25)</p>
      <t-slider v-model="value2" :step="25" show-stops />
      <div class="value-display">Current value: {{ value2 }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref(40);
const value2 = ref(50);
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
