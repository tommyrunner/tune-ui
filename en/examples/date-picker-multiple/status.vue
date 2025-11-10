<template>
  <div class="date-picker-demo">
    <!-- Disabled state -->
    <div class="demo-item">
      <h4>Disabled State (disabled)</h4>
      <t-date-picker-multiple v-model="disabledDates" disabled :is-range="true" />
      <div class="value-display">
        <div>Selected dates: {{ formatDisplayDates(disabledDates) }}</div>
      </div>
    </div>

    <!-- Disabled dates -->
    <div class="demo-item">
      <h4>Disabled Dates (disabledDate)</h4>
      <t-date-picker-multiple
        v-model="disabledBeforeTodayDates"
        :disabled-date="disableDateBeforeToday"
        :is-range="true"
        placeholder="Cannot select dates before today"
      />
      <div class="value-display">
        <div>Selected dates: {{ formatDisplayDates(disabledBeforeTodayDates) }}</div>
        <div class="disabled-info">Dates before today are disabled</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import dayjs from "dayjs";

// State data
const disabledDates = ref([new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]);
const disabledBeforeTodayDates = ref([]);

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

.disabled-info {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #e0e0e0;
  font-size: 13px;
  color: #606266;
}
</style>
