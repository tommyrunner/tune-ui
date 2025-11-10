<template>
  <div class="input-demo">
    <t-input
      v-model="inputValue"
      clearable
      placeholder="Try typing, clearing and pressing Enter"
      @focus="handleFocus"
      @blur="handleBlur"
      @enter="handleEnter"
      @input="handleInput"
      @clear="handleClear"
    />
    <div class="event-log">
      <div class="event-title">Event Log:</div>
      <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
        {{ event }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const inputValue = ref("");
const eventLogs = ref([]);

const handleFocus = value => {
  eventLogs.value.unshift(`Focus: ${value}`);
};

const handleBlur = value => {
  eventLogs.value.unshift(`Blur: ${value}`);
};

const handleEnter = value => {
  eventLogs.value.unshift(`Enter pressed: ${value}`);
};

const handleInput = value => {
  eventLogs.value.unshift(`Input value: ${value}`);
  // Keep only the latest 5 records
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

const handleClear = () => {
  eventLogs.value.unshift("Content cleared");
};
</script>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.t-input {
  width: 240px;
}

.event-log {
  margin-top: 16px;
  padding: 16px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.event-title {
  margin-bottom: 12px;
  font-weight: 600;
  color: #374151;
}

.event-item {
  padding: 6px 8px;
  margin-bottom: 4px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-family: ui-monospace, monospace;
  font-size: 13px;
  color: #4b5563;
}
</style>
