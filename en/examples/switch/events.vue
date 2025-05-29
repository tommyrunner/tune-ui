<template>
  <div class="switch-demo">
    <div class="event-section">
      <div class="event-label">Listen to change event:</div>
      <t-switch v-model="switchValue" @change="handleChange"></t-switch>

      <div class="event-log">
        <div>Event Log:</div>
        <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
          {{ log }}
        </div>
        <button class="clear-btn" @click="clearLogs">Clear Log</button>
      </div>
    </div>

    <div class="event-section">
      <div class="event-label">Current value: {{ switchValue ? "On" : "Off" }}</div>
      <div class="event-controls">
        <button class="action-btn" @click="switchValue = true">Turn On by Code</button>
        <button class="action-btn" @click="switchValue = false">Turn Off by Code</button>
        <button class="action-btn" @click="switchValue = !switchValue">Toggle by Code</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const switchValue = ref(false);
const eventLogs = ref([]);

/**
 * Handle switch change event
 */
const handleChange = value => {
  eventLogs.value.unshift(`Change event triggered: value changed to ${value ? "On" : "Off"}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * Clear log records
 */
const clearLogs = () => {
  eventLogs.value = [];
};
</script>

<style scoped>
.switch-demo {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.event-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 4px;
}

.event-log {
  margin-top: 12px;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
}

.log-item {
  padding: 6px 0;
  border-bottom: 1px dashed #e0e0e0;
}

.log-item:last-child {
  border-bottom: none;
}

.event-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.action-btn,
.clear-btn {
  padding: 6px 12px;
  font-size: 14px;
  background-color: #f0f0f0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
}

.action-btn:hover,
.clear-btn:hover {
  background-color: #e6e6e6;
}
</style>
