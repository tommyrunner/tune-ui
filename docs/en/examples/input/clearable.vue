<template>
  <div class="input-demo">
    <div class="input-row">
      <span class="label">Default with clear button:</span>
      <t-input v-model="inputValue" placeholder="Clear button appears after input" />
    </div>
    <div class="input-row">
      <span class="label">Disable clear button:</span>
      <t-input v-model="inputValue" :clearable="false" placeholder="Clear button disabled" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const inputValue = ref("");
</script>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  width: 120px;
  font-size: 14px;
  color: #4b5563;
}

.t-input {
  width: 240px;
}
</style>
