<template>
  <div class="demo-select">
    <t-select v-model="value" :options="options" placeholder="Please select" />
    <div class="value-display">Current value: {{ value }}</div>

    <div class="type-examples">
      <div class="type-item">
        <p class="type-label">Input type</p>
        <t-select v-model="typeValue" :options="options" type="input" placeholder="Please select" />
      </div>
      <div class="type-item">
        <p class="type-label">Text type</p>
        <t-select v-model="typeValue" :options="options" type="text" placeholder="Please select" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
const typeValue = ref("");

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" }
];
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.value-display {
  padding: 6px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}

.type-examples {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.type-item {
  min-width: 200px;
}

.type-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 6px;
}
</style>
