<template>
  <div class="input-number-demo">
    <div class="row">
      <span class="label">Small</span>
      <t-input-number v-model="value" size="small" placeholder="Small input" />
    </div>
    <div class="row">
      <span class="label">Default</span>
      <t-input-number v-model="value" placeholder="Default input" />
    </div>
    <div class="row">
      <span class="label">Large</span>
      <t-input-number v-model="value" size="large" placeholder="Large input" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref(0);
</script>

<style scoped>
.input-number-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  width: 80px;
  font-size: 14px;
  color: #4b5563;
}

.t-input-number {
  width: 200px;
}
</style>
