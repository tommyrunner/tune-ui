<template>
  <div class="input-number-demo">
    <div class="row">
      <span class="label">Basic range</span>
      <t-input-number v-model="rangeValue" :is-range="true" placeholder="Please enter range" />
    </div>
    <div class="row">
      <span class="label">Limited range</span>
      <t-input-number v-model="rangeValue" :is-range="true" :min-value="0" :max-value="100" placeholder="Range limit: 0-100" />
    </div>
    <div class="value-display">Current value: [{{ rangeValue[0] }}, {{ rangeValue[1] }}]</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const rangeValue = ref([0, 100]);
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
  width: 80px;
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
  width: 240px;
}
</style>
