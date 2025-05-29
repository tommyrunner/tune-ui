<template>
  <div class="demo-select">
    <div class="clearable-example">
      <t-select v-model="value" :options="options" clearable placeholder="Click right icon to clear" />
    </div>

    <div class="clear-events">
      <t-select v-model="eventValue" :options="options" clearable placeholder="Clear event example" @clear="handleClear" />
      <div class="event-log">
        <div>Clear count: {{ clearCount }}</div>
        <div>Current value: {{ eventValue }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("1"); // Default select first item
const eventValue = ref("2"); // Default select second item
const clearCount = ref(0);

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" }
];

const handleClear = () => {
  clearCount.value++;
};
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.clearable-example,
.clear-events {
  margin-bottom: 16px;
}

.event-log {
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}
</style>
