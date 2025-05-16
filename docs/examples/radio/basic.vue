<template>
  <div class="radio-demo">
    <div class="radio-group">
      <t-radio v-model="radio1" :value="true">单选框</t-radio>
      <div class="value-display">当前值: {{ radio1 }}</div>
    </div>
    <div class="radio-group">
      <t-radio v-model="radio2" value="选项1">选项1</t-radio>
      <t-radio v-model="radio2" value="选项2">选项2</t-radio>
      <div class="value-display">当前值: {{ radio2 }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TRadio } from "tune-ui";

const radio1 = ref(false);
const radio2 = ref("选项1");
</script>

<style scoped>
.radio-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
