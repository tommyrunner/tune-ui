<template>
  <div class="demo-rate">
    <div class="rate-item">
      <p class="rate-label">Basic Rating</p>
      <t-rate v-model="value" />
      <div class="value-display">Current value: {{ value }}</div>
    </div>

    <div class="rate-item">
      <p class="rate-label">Disabled State</p>
      <t-rate v-model="disabledValue" disabled />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref(3);
const disabledValue = ref(4);
</script>

<style scoped>
.demo-rate {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.rate-item {
  margin-bottom: 16px;
}

.rate-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}

.value-display {
  margin-top: 8px;
  padding: 6px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}
</style>
