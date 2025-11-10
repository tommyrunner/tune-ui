<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>Event Listening:</p>
        <t-date-picker
          v-model="date"
          value-format="YYYY-MM-DD"
          show-time
          @change="handleChange"
          @panel-change="handlePanelChange"
          @clear="handleClear"
          @focus="handleFocus"
          @blur="handleBlur"
          @time-dialog-open="handleTimeDialogOpen"
          @time-dialog-close="handleTimeDialogClose"
          @date-dialog-open="handleDateDialogOpen"
          @date-dialog-close="handleDateDialogClose"
        />
      </div>

      <div class="item">
        <div class="event-log">
          <div class="event-title">Event Log (Latest 5):</div>
          <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
            {{ event }}
          </div>
          <div class="event-buttons">
            <button @click="clearLogs">Clear Log</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import type { ModeType } from "@/packages/calendar/calendar";

// Event example data
const date = ref("2023-06-15");
const eventLogs = ref<string[]>([]);

// Add event log
const addLog = (message: string) => {
  eventLogs.value.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

// Clear logs
const clearLogs = () => {
  eventLogs.value = [];
};

// Event handlers
const handleChange = (value: any) => {
  addLog(`change: Value changed to ${value}`);
};

const handlePanelChange = (mode: ModeType) => {
  addLog(`panel-change: Panel switched to ${mode} mode`);
};

const handleClear = () => {
  addLog("clear: Value cleared");
};

const handleFocus = () => {
  addLog("focus: Focused");
};

const handleBlur = () => {
  addLog("blur: Blurred");
};

const handleTimeDialogOpen = () => {
  addLog("time-dialog-open: Time dialog opened");
};

const handleTimeDialogClose = () => {
  addLog("time-dialog-close: Time dialog closed");
};

const handleDateDialogOpen = () => {
  addLog("date-dialog-open: Date dialog opened");
};

const handleDateDialogClose = () => {
  addLog("date-dialog-close: Date dialog closed");
};
</script>

<style lang="scss" scoped>
.example-container {
  width: 100%;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 20px;

  .item {
    flex: 1;
    min-width: 250px;

    p {
      margin-bottom: 8px;
      font-weight: 500;
    }
  }
}

.event-log {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  .event-title {
    font-weight: 500;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e4e7ed;
  }

  .event-item {
    padding: 6px 0;
    border-bottom: 1px dashed #e4e7ed;
    font-size: 14px;
    word-break: break-all;
  }

  .event-buttons {
    margin-top: auto;
    padding-top: 12px;

    button {
      padding: 6px 12px;
      background-color: #f0f0f0;
      border: 1px solid #dcdfe6;
      border-radius: 3px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: #e6e6e6;
      }
    }
  }
}
</style>
