<template>
  <div class="demo-rate">
    <div class="half-item">
      <p class="half-label">支持半选（默认）</p>
      <t-rate v-model="value1" :is-half="true" />
      <div class="value-display">当前值: {{ value1 }}</div>
    </div>

    <div class="half-item">
      <p class="half-label">禁用半选</p>
      <t-rate v-model="value2" :is-half="false" />
      <div class="value-display">当前值: {{ value2 }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TRate } from "tune-ui";

const value1 = ref(2.5);
const value2 = ref(3);
</script>

<style scoped>
.demo-rate {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.half-item {
  margin-bottom: 16px;
}

.half-label {
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
