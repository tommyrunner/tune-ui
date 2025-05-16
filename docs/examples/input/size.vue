<template>
  <div class="input-demo">
    <div class="input-row">
      <span class="label">小型输入框：</span>
      <t-input size="small" placeholder="small" />
    </div>
    <div class="input-row">
      <span class="label">默认输入框：</span>
      <t-input placeholder="default" />
    </div>
    <div class="input-row">
      <span class="label">大型输入框：</span>
      <t-input size="large" placeholder="large" />
    </div>
  </div>
</template>

<script setup>
import { TInput } from "tune-ui";
</script>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  width: 100px;
  font-size: 14px;
  color: #4b5563;
}

.t-input {
  width: 240px;
}
</style>
