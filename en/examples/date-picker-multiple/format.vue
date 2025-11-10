<template>
  <div class="date-picker-demo">
    <!-- Value formatting -->
    <div class="demo-item">
      <h4>Value Formatting (valueFormat: YYYY/MM/DD)</h4>
      <t-date-picker-multiple v-model="formattedValueDates" value-format="YYYY/MM/DD" :is-range="true" />
      <div class="value-display">
        <div>Formatted value: {{ formattedValueDates }}</div>
        <div class="type-info">
          Type: {{ typeof formattedValueDates[0] === "undefined" ? "-" : typeof formattedValueDates[0] }}
        </div>
      </div>
    </div>

    <!-- Display formatting -->
    <div class="demo-item">
      <h4>Display Formatting (format: DD MMM YYYY)</h4>
      <t-date-picker-multiple v-model="formattedDisplayDates" format="DD MMM YYYY" :is-range="true" />
      <div class="value-display">
        <div>Selected dates: {{ formatDisplayDates(formattedDisplayDates) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import dayjs from "dayjs";

// State data
const formattedValueDates = ref([]);
const formattedDisplayDates = ref([]);

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

.type-info {
  margin-top: 4px;
  font-size: 13px;
  color: #606266;
}
</style>
