<template>
  <div class="color-picker-demo">
    <t-color-picker v-model="color" :predefine="predefineColors" />
    <div class="color-value">当前选择的颜色值: {{ color }}</div>
    <div class="predefine-colors">
      <div class="predefine-title">预定义颜色列表:</div>
      <div class="predefine-list">
        <div
          v-for="(preColor, index) in predefineColors"
          :key="index"
          class="predefine-item"
          :style="{ backgroundColor: preColor }"
          @click="color = preColor"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// 预定义颜色列表
const predefineColors = [
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "#ff69b4"
];

// 默认颜色值
const color = ref("#1e90ff");
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

.predefine-colors {
  margin-top: 16px;
}

.predefine-title {
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
}

.predefine-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.predefine-item {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}
</style> 