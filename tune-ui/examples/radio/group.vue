<template>
  <div class="radio-demo">
    <t-radio-group v-model="groupValue">
      <t-radio value="1">选项1</t-radio>
      <t-radio value="2">选项2</t-radio>
      <t-radio value="3">选项3</t-radio>
      <t-radio value="4" disabled>禁用选项</t-radio>
    </t-radio-group>
    <div class="value-display">当前值: {{ groupValue }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const groupValue = ref("1");
</script>

<style scoped>
.radio-demo {
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
</style>
