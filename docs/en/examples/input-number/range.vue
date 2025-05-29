<template>
  <div class="input-number-demo">
    <div class="row">
      <span class="label">No limit</span>
      <t-input-number v-model="value1" placeholder="No range limit" />
    </div>
    <div class="row">
      <span class="label">Min value: 0</span>
      <t-input-number v-model="value2" :min-value="0" placeholder="Minimum value is 0" />
    </div>
    <div class="row">
      <span class="label">Max value: 100</span>
      <t-input-number v-model="value3" :max-value="100" placeholder="Maximum value is 100" />
    </div>
    <div class="row">
      <span class="label">Range: 0 - 100</span>
      <t-input-number v-model="value4" :min-value="0" :max-value="100" placeholder="Range: 0-100" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(50);
const value4 = ref(50);
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

.t-input-number {
  width: 200px;
}
</style>
