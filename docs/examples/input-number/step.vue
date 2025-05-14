<template>
  <div class="input-number-demo">
    <div class="row">
      <span class="label">步长: 1 (默认)</span>
      <t-input-number v-model="value" placeholder="默认步长" />
    </div>
    <div class="row">
      <span class="label">步长: 5</span>
      <t-input-number v-model="value" :step="5" placeholder="步长为5" />
    </div>
    <div class="row">
      <span class="label">步长: 10</span>
      <t-input-number v-model="value" :step="10" placeholder="步长为10" />
    </div>
    <div class="value-display">当前值: {{ value }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TInputNumber } from "tune-ui";

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
