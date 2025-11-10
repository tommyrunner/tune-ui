<template>
  <div class="progress-demo">
    <div class="progress-row">
      <t-progress :percentage="percentage" color="#8e44ad"></t-progress>
      <div class="color-label">自定义单色</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="percentage" color="#1abc9c"></t-progress>
      <div class="color-label">自定义单色</div>
    </div>
    <div class="progress-row">
      <t-progress
        :percentage="percentage"
        :color="[
          { color: '#f56c6c', percentage: 20 },
          { color: '#e6a23c', percentage: 40 },
          { color: '#5cb87a', percentage: 60 },
          { color: '#1989fa', percentage: 80 },
          { color: '#6f7ad3', percentage: 100 }
        ]"
      ></t-progress>
      <div class="color-label">分段颜色</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="percentage" :color="customColorMethod"></t-progress>
      <div class="color-label">函数计算颜色</div>
    </div>
    <div class="progress-controls">
      <t-button @click="decrease">-</t-button>
      <t-button @click="increase">+</t-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// 百分比进度
const percentage = ref(50);

// 增加进度
const increase = () => {
  percentage.value = Math.min(100, percentage.value + 10);
};

// 减少进度
const decrease = () => {
  percentage.value = Math.max(0, percentage.value - 10);
};

// 自定义颜色方法
const customColorMethod = percentage => {
  if (percentage < 30) {
    return "#f56c6c";
  } else if (percentage < 70) {
    return "#e6a23c";
  } else {
    return "#5cb87a";
  }
};
</script>

<style scoped>
.progress-demo {
  width: 100%;
}

.progress-row {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.color-label {
  margin-left: 15px;
  color: #606266;
  font-size: 14px;
}

.progress-controls {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}
</style> 