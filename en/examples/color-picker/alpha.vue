<template>
  <div class="color-picker-demo">
    <t-color-picker v-model="color" show-alpha />
    <div class="color-value">Currently selected color value: {{ color }}</div>
    <div class="color-preview" :style="{ color: color }">Alpha effect preview</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Default color value with alpha
const color = ref("rgba(64, 158, 255, 0.68)");
</script>

<style scoped>
.color-picker-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.color-value {
  font-size: 14px;
  color: #606266;
}

.color-preview {
  padding: 10px 15px;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==");
}
</style>
