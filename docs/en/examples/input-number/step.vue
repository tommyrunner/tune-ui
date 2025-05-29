<template>
  <div class="input-number-demo">
    <div class="row">
      <span class="label">Step: 1 (default)</span>
      <t-input-number v-model="value" placeholder="Default step" />
    </div>
    <div class="row">
      <span class="label">Step: 5</span>
      <t-input-number v-model="value" :step="5" placeholder="Step is 5" />
    </div>
    <div class="row">
      <span class="label">Step: 10</span>
      <t-input-number v-model="value" :step="10" placeholder="Step is 10" />
    </div>
    <div class="value-display">Current value: {{ value }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref(0);
</script>

<style scoped>
.input-number-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  width: 120px;
  font-size: 14px;
  color: #4b5563;
}

.value-display {
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}

.t-input-number {
  width: 200px;
}
</style>
