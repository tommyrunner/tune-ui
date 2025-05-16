<template>
  <div class="progress-demo">
    <div class="progress-dashboard-container">
      <div class="progress-dashboard-item">
        <t-progress :percentage="25" type="dashboard"></t-progress>
        <div class="dashboard-label">25%</div>
      </div>
      <div class="progress-dashboard-item">
        <t-progress :percentage="75" type="dashboard"></t-progress>
        <div class="dashboard-label">75%</div>
      </div>
      <div class="progress-dashboard-item">
        <t-progress :percentage="100" type="dashboard" status="success"></t-progress>
        <div class="dashboard-label">完成</div>
      </div>
    </div>
    <div class="dashboard-controls">
      <div class="control-row">
        <t-progress :percentage="dynamicPercentage" type="dashboard"></t-progress>
        <div class="value-display">{{ dynamicPercentage }}%</div>
      </div>
      <div class="button-group">
        <t-button @click="startProgress">开始</t-button>
        <t-button @click="resetProgress">重置</t-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { TProgress, TButton } from "tune-ui";

// 动态进度值
const dynamicPercentage = ref(0);
let intervalId = null;

// 开始进度动画
const startProgress = () => {
  // 清除可能存在的定时器
  resetProgress();
  
  // 创建新的定时器
  intervalId = setInterval(() => {
    if (dynamicPercentage.value < 100) {
      dynamicPercentage.value += 1;
    } else {
      clearInterval(intervalId);
    }
  }, 100);
};

// 重置进度
const resetProgress = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  dynamicPercentage.value = 0;
};

// 组件卸载时清除定时器
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
.progress-demo {
  width: 100%;
}

.progress-dashboard-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.progress-dashboard-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dashboard-label {
  margin-top: 10px;
  font-size: 14px;
  color: #606266;
}

.dashboard-controls {
  margin-top: 30px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #f5f7fa;
}

.control-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.value-display {
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #409eff;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style> 