<template>
  <div class="checkbox-demo">
    <div class="checkbox-item">
      <t-checkbox v-model="checked1" size="small">Small Size</t-checkbox>
    </div>
    <div class="checkbox-item">
      <t-checkbox v-model="checked2" size="default">Default Size</t-checkbox>
    </div>
    <div class="checkbox-item">
      <t-checkbox v-model="checked3" size="large">Large Size</t-checkbox>
    </div>
    <div class="value-display">Small: {{ checked1 }} | Default: {{ checked2 }} | Large: {{ checked3 }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
