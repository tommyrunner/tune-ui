<template>
  <div class="input-demo">
    <t-input v-model="inputValue" :maxLength="10" placeholder="最多输入10个字符" />
    <div class="value-display">当前长度: {{ inputValue.length }}/10</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TInput } from "tune-ui";

const inputValue = ref("");
</script>

<style scoped>
.input-demo {
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

.t-input {
  width: 240px;
}
</style>
