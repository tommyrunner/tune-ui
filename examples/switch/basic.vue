<template>
  <div class="switch-demo">
    <div class="switch-item">
      <t-switch v-model="switchValue"></t-switch>
      <div class="value-display">当前状态: {{ switchValue ? "开启" : "关闭" }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const switchValue = ref(true);
</script>

<style scoped>
.switch-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.switch-item {
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
