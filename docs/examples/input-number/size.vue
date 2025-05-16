<template>
  <div class="input-number-demo">
    <div class="row">
      <span class="label">小型</span>
      <t-input-number v-model="value" size="small" placeholder="小型输入框" />
    </div>
    <div class="row">
      <span class="label">默认</span>
      <t-input-number v-model="value" placeholder="默认输入框" />
    </div>
    <div class="row">
      <span class="label">大型</span>
      <t-input-number v-model="value" size="large" placeholder="大型输入框" />
    </div>
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
  width: 80px;
  font-size: 14px;
  color: #4b5563;
}

.t-input-number {
  width: 200px;
}
</style>
