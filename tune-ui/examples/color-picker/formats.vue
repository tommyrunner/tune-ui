<template>
  <div class="color-picker-demo">
    <div class="format-row">
      <div class="format-item">
        <t-color-picker v-model="colors.hex" color-format="hex" />
        <div class="format-label">HEX格式</div>
        <div class="format-value">{{ colors.hex }}</div>
      </div>
      
      <div class="format-item">
        <t-color-picker v-model="colors.rgb" color-format="rgb" />
        <div class="format-label">RGB格式</div>
        <div class="format-value">{{ colors.rgb }}</div>
      </div>
      
      <div class="format-item">
        <t-color-picker v-model="colors.rgba" color-format="rgb" show-alpha />
        <div class="format-label">RGBA格式</div>
        <div class="format-value">{{ colors.rgba }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";


// 不同格式的颜色值
const colors = reactive({
  hex: "#409EFF",
  rgb: "rgb(64, 158, 255)",
  rgba: "rgba(64, 158, 255, 0.68)"
});
</script>

<style scoped>
.color-picker-demo {
  width: 100%;
}

.format-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.format-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.format-label {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  margin-top: 8px;
}

.format-value {
  font-size: 13px;
  font-family: monospace;
  padding: 4px 8px;
  background-color: #f5f7fa;
  border-radius: 4px;
  word-break: break-all;
  max-width: 200px;
  text-align: center;
}
</style> 