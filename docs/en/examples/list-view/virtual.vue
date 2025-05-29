<template>
  <div class="list-view-demo">
    <t-list-view
      :listData="largeData"
      :height="300"
      :itemHeight="50"
      :isVirtualized="true"
      @scroll="handleScroll"
      @update-view="handleUpdateView"
    >
      <template #default="data">
        <div class="list-item">{{ data?.index + 1 }}. {{ data?.row?.label }}</div>
      </template>
    </t-list-view>

    <div class="control-panel">
      <div class="data-info">Total data: {{ largeData.length }} items</div>
      <div class="event-log">
        <div class="log-title">Event Log:</div>
        <div v-for="(event, index) in eventLogs" :key="index" class="log-item">
          {{ event }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Generate large amount of data for virtual scrolling test
const largeData = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  label: `List Item ${index + 1}`
}));

// Event logs
const eventLogs = ref([]);

// Handle scroll event
const handleScroll = element => {
  eventLogs.value.unshift(`Scroll position: ${Math.round(element.scrollTop)}px`);
  if (eventLogs.value.length > 5) eventLogs.value.pop();
};

// Handle view update event
const handleUpdateView = element => {
  eventLogs.value.unshift(`View updated: ${element.children.length} elements`);
  if (eventLogs.value.length > 5) eventLogs.value.pop();
};
</script>

<style scoped>
.list-view-demo {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list-item {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;
}

.list-item:hover {
  background-color: #f9fafb;
}

.control-panel {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
}

.data-info {
  margin-bottom: 12px;
  font-weight: 500;
}

.event-log {
  padding: 12px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.log-title {
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
}

.log-item {
  padding: 6px 8px;
  margin-bottom: 4px;
  background-color: #f3f4f6;
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
}
</style>
