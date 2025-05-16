<template>
  <div class="example-container">
    <div class="mode-item">
      <h4>日期模式</h4>
      <t-calendar v-model="dateValue" mode="date" />
    </div>
    
    <div class="mode-item">
      <h4>月份模式</h4>
      <t-calendar v-model="monthValue" mode="month" />
    </div>
    
    <div class="mode-item">
      <h4>年份模式</h4>
      <t-calendar v-model="yearValue" mode="year" />
    </div>
    
    <div class="value-display">
      <p>日期模式: {{ formatDate(dateValue) }}</p>
      <p>月份模式: {{ formatDate(monthValue) }}</p>
      <p>年份模式: {{ formatDate(yearValue) }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TCalendar } from "tune-ui";

const dateValue = ref(new Date());
const monthValue = ref(new Date());
const yearValue = ref(new Date());

const formatDate = (date) => {
  if (!date) return "未选择";
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