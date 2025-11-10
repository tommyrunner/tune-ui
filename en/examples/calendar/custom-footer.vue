<template>
  <div class="example-container">
    <t-calendar v-model="date" ref="calendarRef">
      <template #footer>
        <div class="calendar-footer">
          <t-button size="small" type="primary" @click="jumpToToday">Today</t-button>
          <t-button size="small" @click="jumpToNextMonth">Next Month</t-button>
          <t-button size="small" @click="switchMode">Switch View</t-button>
          <t-button size="small" @click="jumpToRandomDate">Random Date</t-button>
        </div>
      </template>
    </t-calendar>
    
    <div class="value-display">
      <p>Currently selected date: {{ formatDate(date) }}</p>
      <p>Current panel mode: {{ currentMode }}</p>
      <div class="event-log">
        <div class="event-title">Event Log:</div>
        <div v-for="(event, index) in eventLogs" :key="index" class="event-item">{{ event }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

import type { ModeType } from "@/packages/calendar/calendar";

const date = ref(new Date());
const calendarRef = ref();
const currentMode = ref("date");
const eventLogs = reactive([]);

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

/**
 * Log event
 * @param event Event description
 */
const logEvent = event => {
  eventLogs.unshift(event);
  if (eventLogs.length > 3) eventLogs.pop();
};

/**
 * Jump to today
 */
const jumpToToday = () => {
  const today = new Date();
  calendarRef.value.jumpToDate(today);
  logEvent(`Jump to today: ${formatDate(today)}`);
};

/**
 * Jump to next month
 */
const jumpToNextMonth = () => {
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  calendarRef.value.jumpToDate(nextMonth);
  logEvent(`Jump to next month: ${formatDate(nextMonth)}`);
};

/**
 * Switch mode
 */
const switchMode = () => {
  const modes = ["date", "month", "year"];
  const currentIndex = modes.indexOf(currentMode.value);
  const nextIndex = (currentIndex + 1) % modes.length;
  const nextMode = modes[nextIndex];
  
  calendarRef.value.switchPanelMode(nextMode);
  currentMode.value = nextMode;
  logEvent(`Switch view mode: ${nextMode}`);
};

/**
 * Jump to random date
 */
const jumpToRandomDate = () => {
  // Generate random number between -182 to 182 days, within half year range
  const randomDays = Math.floor(Math.random() * 365) - 182;
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() + randomDays);
  
  calendarRef.value.jumpToDate(randomDate);
  logEvent(`Jump to random date: ${formatDate(randomDate)}`);
};
</script>

<style scoped>
.example-container {
  margin-bottom: 20px;
}

.calendar-footer {
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  border-top: 1px solid #ebeef5;
}

.value-display {
  margin-top: 16px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
}

.event-log {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #e0e0e0;
}

.event-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.event-item {
  padding: 4px 0;
  border-bottom: 1px dashed #ebeef5;
  font-size: 13px;
}
</style> 