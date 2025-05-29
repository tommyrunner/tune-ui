<template>
  <div class="textarea-demo">
    <t-textarea
      v-model="textValue"
      :debounce="handleDebounce"
      :debounceDelay="1000"
      placeholder="Callback triggered after 1 second delay"
    />
    <div class="value-display">
      <div>Real-time value: {{ textValue }}</div>
      <div>Debounced value (1 second delay): {{ debounceValue }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const textValue = ref("");
const debounceValue = ref("");

/**
 * Handle debounce callback
 * @param {string} value - Input value
 */
const handleDebounce = value => {
  debounceValue.value = value;
};
</script>

<style scoped>
.textarea-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.value-display {
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.t-textarea {
  width: 320px;
}
</style>
