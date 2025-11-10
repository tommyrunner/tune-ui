<template>
  <div class="color-picker-demo">
    <div class="demo-item">
      <t-color-picker v-model="color" disabled />
      <div class="demo-label">Disabled State</div>
    </div>
    
    <div class="demo-controls">
      <div class="demo-value">Current color value: {{ color }}</div>
      <t-button @click="toggleDisabled">
        {{ isDisabled ? 'Enable' : 'Disable' }}
      </t-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Default color value
const color = ref("#409EFF");
const isDisabled = ref(true);

// Toggle disabled state
const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};
</script>

<style scoped>
.color-picker-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.demo-label {
  font-size: 14px;
  color: #606266;
}

.demo-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.demo-value {
  font-size: 14px;
  color: #606266;
}
</style> 