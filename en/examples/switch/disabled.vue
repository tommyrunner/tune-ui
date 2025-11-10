<template>
  <div class="switch-demo">
    <div class="switch-row">
      <span class="label">Disabled On State:</span>
      <t-switch v-model="switchOn" disabled></t-switch>
    </div>
    <div class="switch-row">
      <span class="label">Disabled Off State:</span>
      <t-switch v-model="switchOff" disabled></t-switch>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const switchOn = ref(true);
const switchOff = ref(false);
</script>

<style scoped>
.switch-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.switch-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.label {
  font-size: 14px;
  color: #4b5563;
  width: 120px;
}
</style>
