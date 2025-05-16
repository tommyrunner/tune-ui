<template>
  <div class="checkbox-demo">
    <div class="checkbox-item">
      <t-checkbox v-model="checked">基础复选框</t-checkbox>
      <div class="value-display">当前值: {{ checked }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TCheckbox } from "tune-ui";

const checked = ref(false);
</script>

<style scoped>
.checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.checkbox-item {
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
