<template>
  <div class="input-number-demo">
    <div class="row">
      <span class="label">显示控制按钮</span>
      <t-input-number v-model="value" :is-controls="true" placeholder="默认显示控制按钮" />
    </div>
    <div class="row">
      <span class="label">隐藏控制按钮</span>
      <t-input-number v-model="value" :is-controls="false" placeholder="隐藏控制按钮" />
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
