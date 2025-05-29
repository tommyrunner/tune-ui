<template>
  <div class="textarea-demo">
    <t-textarea
      v-model="textValue"
      placeholder="Trigger various events"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @enter="handleEnter"
    />
    <div class="event-log">
      <div class="event-title">Event Log:</div>
      <div v-for="(log, index) in eventLogs" :key="index" class="event-item">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const textValue = ref("");
const eventLogs = ref([]);

/**
 * Add event log
 * @param {string} type - Event type
 * @param {string} value - Event value
 */
const addLog = (type, value) => {
  const now = new Date();
  const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  eventLogs.value.unshift(`[${timeStr}] ${type}: ${value || "(empty)"}`);

  // Limit log count
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * Handle focus event
 */
const handleFocus = value => {
  addLog("Focus", value);
};

/**
 * Handle blur event
 */
const handleBlur = value => {
  addLog("Blur", value);
};

/**
 * Handle input event
 */
const handleInput = value => {
  addLog("Input", value);
};

/**
 * Handle enter event
 */
const handleEnter = value => {
  addLog("Enter", value);
};
</script>

<style scoped>
.textarea-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-log {
  padding: 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 14px;
}

.event-title {
  font-weight: 500;
  margin-bottom: 8px;
  color: #374151;
}

.event-item {
  padding: 6px 0;
  border-bottom: 1px dashed #e5e7eb;
  color: #4b5563;
  font-family: monospace;
}

.event-item:last-child {
  border-bottom: none;
}

.t-textarea {
  width: 320px;
}
</style>
