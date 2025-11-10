<template>
  <div class="example-container">
    <div class="disabled-item">
      <h4>Disable dates before today</h4>
      <t-calendar v-model="disabledBeforeTodayDate" :disabled-date="disableDateBeforeToday" />
    </div>
    
    <div class="disabled-item">
      <h4>Disable weekends</h4>
      <t-calendar v-model="disabledWeekendDate" :disabled-date="disableWeekend" />
    </div>
    
    <div class="value-display">
      <p>Disabled before today: {{ formatDate(disabledBeforeTodayDate) }}</p>
      <p>Disabled weekends: {{ formatDate(disabledWeekendDate) }}</p>
      <div class="disabled-info">
        <div>Disabled rules description:</div>
        <div>- First calendar: dates before today are disabled</div>
        <div>- Second calendar: weekends (Saturday and Sunday) are disabled</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";


const disabledBeforeTodayDate = ref(new Date());
const disabledWeekendDate = ref(new Date());

/**
 * Disable dates before today
 * @param date Date object
 * @returns Whether to disable
 */
const disableDateBeforeToday = date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Disable weekends
 * @param date Date object
 * @returns Whether to disable
 */
const disableWeekend = date => {
  const day = date.getDay();
  return day === 0 || day === 6; // Saturday and Sunday
};

/**
 * Format date
 * @param date Date object
 * @returns Formatted date string
 */
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

.disabled-item {
  margin-bottom: 20px;
}

.disabled-item h4 {
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

.disabled-info {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px dashed #e0e0e0;
  font-size: 12px;
  color: #909399;
}
</style> 