<template>
  <div class="checkbox-demo">
    <div class="checkbox-item">
      <t-checkbox v-model="checked1" size="small">小尺寸</t-checkbox>
    </div>
    <div class="checkbox-item">
      <t-checkbox v-model="checked2" size="default">默认尺寸</t-checkbox>
    </div>
    <div class="checkbox-item">
      <t-checkbox v-model="checked3" size="large">大尺寸</t-checkbox>
    </div>
    <div class="value-display">小尺寸: {{ checked1 }} | 默认尺寸: {{ checked2 }} | 大尺寸: {{ checked3 }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TCheckbox } from "tune-ui";

const checked1 = ref(true);
const checked2 = ref(true);
const checked3 = ref(true);
</script>

<style scoped>
.checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.checkbox-item {
  margin-bottom: 12px;
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
