<template>
  <div class="date-picker-demo">
    <div class="demo-item">
      <h4>Event Handling Example</h4>
      <t-date-picker-multiple
        v-model="dateValues"
        :is-range="true"
        @change="handleChange"
        @panel-change="handlePanelChange"
        @clear="handleClear"
        @focus="handleFocus"
        @blur="handleBlur"
        @date-dialog-open="handleDialogOpen"
        @date-dialog-close="handleDialogClose"
      />
      <div class="value-display">
        <div class="current-value">Current value: {{ formatDisplayDates(dateValues) }}</div>
        <div class="event-log">
          <div class="event-title">Event Log:</div>
          <div v-for="(log, index) in eventLogs" :key="index" class="event-item">{{ log }}</div>
        </div>
        <div class="actions">
          <button class="clear-btn" @click="clearEventLogs">Clear Event Log</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import dayjs from "dayjs";

// State data
const dateValues = ref([]);
const eventLogs = ref([]);

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

/**
 * Clear event logs
 */
const clearEventLogs = () => {
  eventLogs.value = [];
};

// Event handlers
/**
 * Handle value change event
 */
const handleChange = value => {
  addEventLog(`change event triggered, value: ${formatDisplayDates(value)}`);
};

/**
 * Handle panel change event
 */
const handlePanelChange = mode => {
  addEventLog(`panel-change event triggered, mode: ${mode}`);
};

/**
 * Handle clear event
 */
const handleClear = () => {
  addEventLog("clear event triggered");
};

/**
 * Handle focus event
 */
const handleFocus = () => {
  addEventLog("focus event triggered");
};

/**
 * Handle blur event
 */
const handleBlur = () => {
  addEventLog("blur event triggered");
};

/**
 * Handle date dialog open event
 */
const handleDialogOpen = () => {
  addEventLog("date-dialog-open event triggered");
};

/**
 * Handle date dialog close event
 */
const handleDialogClose = () => {
  addEventLog("date-dialog-close event triggered");
};

/**
 * Add event log and limit maximum count
 */
const addEventLog = log => {
  eventLogs.value.unshift(log);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
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
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
}

.current-value {
  margin-bottom: 10px;
  font-weight: 500;
}

.event-log {
  margin: 10px 0;
  max-height: 200px;
  overflow-y: auto;
}

.event-title {
  font-weight: 500;
  margin-bottom: 6px;
}

.event-item {
  padding: 4px 0;
  border-bottom: 1px dashed #e0e0e0;
  font-size: 13px;
}

.actions {
  margin-top: 10px;
}

.clear-btn {
  padding: 4px 8px;
  background-color: #f2f3f5;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.clear-btn:hover {
  background-color: #e6e8eb;
}
</style>
