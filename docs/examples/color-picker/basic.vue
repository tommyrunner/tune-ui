<template>
  <div class="color-picker-demo">
    <t-color-picker v-model="color" />
    <div class="color-value">当前选择的颜色值: {{ color }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TColorPicker } from "tune-ui";

// 默认颜色值
const color = ref("#409EFF");
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
</style>
