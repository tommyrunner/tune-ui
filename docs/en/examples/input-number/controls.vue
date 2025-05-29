<template>
  <div class="input-number-demo">
    <div class="row">
      <span class="label">Show control buttons</span>
      <t-input-number v-model="value" :is-controls="true" placeholder="Default show control buttons" />
    </div>
    <div class="row">
      <span class="label">Hide control buttons</span>
      <t-input-number v-model="value" :is-controls="false" placeholder="Hide control buttons" />
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
