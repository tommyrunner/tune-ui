<template>
  <div class="demo-rate">
    <div class="events-example">
      <t-rate v-model="value" @change="handleChange" />
      <div class="event-log">
        <div class="log-title">事件记录：</div>
        <div v-for="(log, index) in logs" :key="index" class="log-item">
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TRate } from "tune-ui";

const value = ref(0);
const logs = ref([]);

const handleChange = val => {
  logs.value.unshift(`评分改变: ${val}`);
  if (logs.value.length > 5) {
    logs.value.pop();
  }
};
</script>

<style scoped>
.demo-rate {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.events-example {
  margin-bottom: 16px;
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
