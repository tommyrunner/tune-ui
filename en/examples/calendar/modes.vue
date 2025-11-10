<template>
  <div class="example-container">
    <div class="mode-item">
      <h4>Date Mode</h4>
      <t-calendar v-model="dateValue" mode="date" />
    </div>
    
    <div class="mode-item">
      <h4>Month Mode</h4>
      <t-calendar v-model="monthValue" mode="month" />
    </div>
    
    <div class="mode-item">
      <h4>Year Mode</h4>
      <t-calendar v-model="yearValue" mode="year" />
    </div>
    
    <div class="value-display">
      <p>Date Mode: {{ formatDate(dateValue) }}</p>
      <p>Month Mode: {{ formatDate(monthValue) }}</p>
      <p>Year Mode: {{ formatDate(yearValue) }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const dateValue = ref(new Date());
const monthValue = ref(new Date());
const yearValue = ref(new Date());

const formatDate = date => {
  if (!date) return "Not selected";
  if (typeof date === "string") return date;
  if (typeof date === "number") return new Date(date).toLocaleString();
  return date.toLocaleString();
};
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mode-item {
  margin-bottom: 20px;
}

.mode-item h4 {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
}

.value-display {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
}
</style> 