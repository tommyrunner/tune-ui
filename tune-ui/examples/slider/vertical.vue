<template>
  <div class="demo-slider">
    <div class="vertical-container">
      <div class="vertical-item">
        <p class="vertical-label">基础垂直滑块</p>
        <t-slider v-model="value" vertical height="200px" />
        <div class="value-display">当前值: {{ value }}</div>
      </div>

      <div class="vertical-item">
        <p class="vertical-label">带间断点的垂直滑块</p>
        <t-slider v-model="stopsValue" vertical height="200px" :step="10" show-stops />
        <div class="value-display">当前值: {{ stopsValue }}</div>
      </div>

      <div class="vertical-item">
        <p class="vertical-label">垂直范围滑块</p>
        <t-slider v-model="rangeValue" vertical height="200px" range />
        <div class="value-display">当前值: {{ rangeValue }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const value = ref(50);
const stopsValue = ref(30);
const rangeValue = ref([20, 70]);
</script>

<style scoped>
.demo-slider {
  display: flex;
  flex-direction: column;
}

.vertical-container {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 20px;
  height: 280px;
}

.vertical-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.vertical-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 16px;
  text-align: center;
}

.value-display {
  margin-top: 16px;
  padding: 6px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
  text-align: center;
  width: 100px;
}
</style>
