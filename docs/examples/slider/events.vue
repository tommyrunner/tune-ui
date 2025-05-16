<template>
  <div class="demo-slider">
    <div class="events-item">
      <t-slider v-model="value" @change="handleChange" @input="handleInput" />
      <div class="value-display">当前值: {{ value }}</div>

      <div class="event-log">
        <div class="log-title">事件日志:</div>
        <div v-for="(log, index) in logs" :key="index" class="log-item">
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TSlider } from "tune-ui";

const value = ref(50);
const logs = ref([]);

const addLog = (event, val) => {
  logs.value.unshift(`${event}: ${typeof val === "object" ? JSON.stringify(val) : val}`);
  if (logs.value.length > 5) {
    logs.value.pop();
  }
};

const handleChange = val => {
  addLog("change事件", val);
};

const handleInput = val => {
  addLog("input事件", val);
};
</script>

<style scoped>
.demo-slider {
  display: flex;
  flex-direction: column;
}

.events-item {
  margin-bottom: 16px;
}

.value-display {
  margin-top: 12px;
  padding: 6px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}

.event-log {
  margin-top: 16px;
  padding: 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.log-title {
  margin-bottom: 8px;
  font-weight: 500;
  color: #4b5563;
}

.log-item {
  padding: 4px 0;
  color: #6b7280;
  font-size: 14px;
  font-family: monospace;
}
</style>
