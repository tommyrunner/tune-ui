<template>
  <div class="demo-rate">
    <div class="max-item">
      <p class="max-label">Default Max Value (5)</p>
      <t-rate v-model="value1" />
    </div>

    <div class="max-item">
      <p class="max-label">Custom Max Value (3)</p>
      <t-rate v-model="value2" :max="3" />
    </div>

    <div class="max-item">
      <p class="max-label">Custom Max Value (10)</p>
      <t-rate v-model="value3" :max="10" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value1 = ref(3);
const value2 = ref(2);
const value3 = ref(7);
</script>

<style scoped>
.demo-rate {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.max-item {
  margin-bottom: 16px;
}

.max-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}
</style>
