<template>
  <div class="color-picker-demo">
    <div class="size-row">
      <div class="size-item">
        <t-color-picker v-model="colors.small" size="small" />
        <div class="size-label">Small</div>
      </div>
      
      <div class="size-item">
        <t-color-picker v-model="colors.default" size="default" />
        <div class="size-label">Default</div>
      </div>
      
      <div class="size-item">
        <t-color-picker v-model="colors.large" size="large" />
        <div class="size-label">Large</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

// Color values for different sizes
const colors = reactive({
  small: "#67C23A",
  default: "#409EFF",
  large: "#E6A23C"
});
</script>

<style scoped>
.color-picker-demo {
  width: 100%;
}

.size-row {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}

.size-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.size-label {
  font-size: 14px;
  color: #606266;
  margin-top: 8px;
}
</style> 