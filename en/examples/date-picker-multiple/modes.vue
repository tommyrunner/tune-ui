<template>
  <div class="date-picker-demo">
    <!-- Date mode -->
    <div class="demo-item">
      <h4>Date Mode (date)</h4>
      <t-date-picker-multiple v-model="dateModeValues" mode="date" :is-range="true" />
      <div class="value-display">
        <span>Selected dates: {{ formatDisplayDates(dateModeValues) }}</span>
      </div>
    </div>

    <!-- Month mode -->
    <div class="demo-item">
      <h4>Month Mode (month)</h4>
      <t-date-picker-multiple v-model="monthModeValues" mode="month" :is-range="true" />
      <div class="value-display">
        <span>Selected months: {{ formatDisplayDates(monthModeValues, "MMM YYYY") }}</span>
      </div>
    </div>

    <!-- Year mode -->
    <div class="demo-item">
      <h4>Year Mode (year)</h4>
      <t-date-picker-multiple v-model="yearModeValues" mode="year" :is-range="true" />
      <div class="value-display">
        <span>Selected years: {{ formatDisplayDates(yearModeValues, "YYYY") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import dayjs from "dayjs";

// State data
const dateModeValues = ref([]);
const monthModeValues = ref([]);
const yearModeValues = ref([]);

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
</style>
