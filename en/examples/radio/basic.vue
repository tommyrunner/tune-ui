<template>
  <div class="radio-demo">
    <div class="radio-group">
      <t-radio v-model="radio1" :value="true">Radio Button</t-radio>
      <div class="value-display">Current value: {{ radio1 }}</div>
    </div>
    <div class="radio-group">
      <t-radio v-model="radio2" value="Option 1">Option 1</t-radio>
      <t-radio v-model="radio2" value="Option 2">Option 2</t-radio>
      <div class="value-display">Current value: {{ radio2 }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const radio1 = ref(false);
const radio2 = ref("Option 1");
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
