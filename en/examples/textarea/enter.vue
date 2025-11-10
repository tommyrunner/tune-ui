<template>
  <div class="textarea-demo">
    <div class="textarea-item">
      <div class="textarea-label">Allow line breaks (default):</div>
      <t-textarea v-model="enterValue" placeholder="Can use Enter key for line breaks" />
      <div class="value-display">Current value: {{ enterValue }}</div>
    </div>
    <div class="textarea-item">
      <div class="textarea-label">Disable line breaks:</div>
      <t-textarea v-model="noEnterValue" :isEnter="false" placeholder="Cannot use Enter key for line breaks" />
      <div class="value-display">Current value: {{ noEnterValue }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const enterValue = ref("");
const noEnterValue = ref("");
</script>

<style scoped>
.textarea-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.textarea-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.textarea-label {
  font-size: 14px;
  color: #4b5563;
}

.value-display {
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
  max-height: 120px;
  overflow: auto;
  white-space: pre-wrap;
}

.t-textarea {
  width: 320px;
}
</style>
