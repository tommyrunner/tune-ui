<template>
  <div class="switch-demo">
    <div class="switch-item">
      <div class="size-label">Small Size:</div>
      <t-switch v-model="switchSmall" size="small"></t-switch>
    </div>
    <div class="switch-item">
      <div class="size-label">Default Size:</div>
      <t-switch v-model="switchDefault" size="default"></t-switch>
    </div>
    <div class="switch-item">
      <div class="size-label">Large Size:</div>
      <t-switch v-model="switchLarge" size="large"></t-switch>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const switchSmall = ref(true);
const switchDefault = ref(true);
const switchLarge = ref(true);
</script>

<style scoped>
.switch-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.switch-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.size-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 4px;
}
</style>
