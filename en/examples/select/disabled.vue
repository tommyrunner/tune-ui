<template>
  <div class="demo-select">
    <div class="disable-row">
      <div class="disable-item">
        <p class="disable-label">Fully Disabled</p>
        <t-select v-model="value" :options="options" disabled placeholder="Fully disabled state" />
      </div>

      <div class="disable-item">
        <p class="disable-label">Partial Options Disabled</p>
        <t-select v-model="value" :options="disabledOptions" placeholder="Partial options disabled" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");

// Basic options data
const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" }
];

// Options with disabled items
const disabledOptions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2", disabled: true },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4", disabled: true }
];
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.disable-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.disable-item {
  min-width: 200px;
}

.disable-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}
</style>
