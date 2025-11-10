<template>
  <div class="input-number-demo">
    <t-input-number v-model="value" placeholder="Please enter number" />
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
