<template>
  <div class="checkbox-demo">
    <div class="checkbox-row">
      <t-checkbox v-model="checked1" icon="success">Default Success Icon</t-checkbox>
    </div>
    <div class="checkbox-row">
      <t-checkbox v-model="checked2" icon="lock">Use "lock" Icon</t-checkbox>
    </div>
    <div class="checkbox-row">
      <t-checkbox v-model="checked3" icon="info">Use "info" Icon</t-checkbox>
    </div>
    <div class="checkbox-row">
      <t-checkbox v-model="checked4" icon="close">Use "close" Icon</t-checkbox>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const checked1 = ref(true);
const checked2 = ref(true);
const checked3 = ref(true);
const checked4 = ref(true);
</script>

<style scoped>
.checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.checkbox-row {
  display: flex;
  align-items: center;
}
</style>
