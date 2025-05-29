<template>
  <div class="checkbox-demo">
    <div class="checkbox-item">
      <div class="style-label">Default Square Style:</div>
      <t-checkbox v-model="checked1" radius="square">Square Checkbox</t-checkbox>
    </div>
    <div class="checkbox-item">
      <div class="style-label">Round Style:</div>
      <t-checkbox v-model="checked2" radius="default">Round Checkbox</t-checkbox>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const checked1 = ref(true);
const checked2 = ref(true);
</script>

<style scoped>
.checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.checkbox-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.style-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 4px;
}
</style>
