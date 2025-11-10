<template>
  <div class="date-picker-demo">
    <!-- Range selection mode -->
    <div class="demo-item">
      <h4>Range Selection Mode</h4>
      <t-date-picker-multiple v-model="dateRange" :is-range="true" />
      <div class="value-display">Selected date range: {{ formatDisplayDates(dateRange) }}</div>
    </div>

    <!-- Multiple selection mode -->
    <div class="demo-item">
      <h4>Multiple Selection Mode</h4>
      <t-date-picker-multiple v-model="multipleDates" :is-range="false" placeholder="Please select multiple dates" />
      <div class="value-display">Selected multiple dates: {{ formatDisplayDates(multipleDates) }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import dayjs from "dayjs";

// Range selection default value: current date and 7 days later
const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

// Multiple selection default value: current date, 3 days later and 7 days later
const threeDaysLater = new Date(today);
const sevenDaysLater = new Date(today);
threeDaysLater.setDate(today.getDate() + 3);
sevenDaysLater.setDate(today.getDate() + 7);

// Component state
const dateRange = ref([today, nextWeek]);
const multipleDates = ref([today, threeDaysLater, sevenDaysLater]);

/**
 * Format display dates
 */
const formatDisplayDates = dates => {
  if (!dates || dates.length === 0) return "Not selected";
  return dates
    .map(date => {
      if (typeof date === "string") return date;
      if (date instanceof Date) return dayjs(date).format("YYYY-MM-DD");
      return date;
    })
    .join(", ");
};
</script>

<style scoped>
.date-picker-demo {
  padding: 16px 0;
}

.demo-item {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 500;
}

.value-display {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
}
</style>
