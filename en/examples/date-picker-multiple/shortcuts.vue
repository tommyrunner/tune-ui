<template>
  <div class="date-picker-demo">
    <div class="demo-item">
      <h4>Date Range Selection with Shortcuts</h4>
      <t-date-picker-multiple
        v-model="dateRangeWithShortcuts"
        :shortcuts="shortcuts"
        :is-range="true"
        placeholder="Use shortcuts to select date range"
      />
      <div class="value-display">
        <div>Selected date range: {{ formatDisplayDates(dateRangeWithShortcuts) }}</div>
        <div class="shortcuts-info">Available shortcuts: Last week, Last month, Last 3 months</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import dayjs from "dayjs";

// State data
const dateRangeWithShortcuts = ref([]);

// Shortcuts definition
const shortcuts = [
  {
    label: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
  },
  {
    label: "Last month",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 1);
      return [start, end];
    }
  },
  {
    label: "Last 3 months",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 3);
      return [start, end];
    }
  }
];

/**
 * Format display dates
 */
const formatDisplayDates = (dates, format = "YYYY-MM-DD") => {
  if (!dates || dates.length === 0) return "Not selected";
  return dates
    .map(date => {
      if (typeof date === "string") return date;
      if (date instanceof Date) return dayjs(date).format(format);
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

.shortcuts-info {
  margin-top: 6px;
  font-size: 13px;
  color: #606266;
}
</style>
