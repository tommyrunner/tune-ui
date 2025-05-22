<template>
  <div class="progress-demo">
    <h4>使用format属性</h4>
    <div class="progress-row">
      <t-progress :percentage="50" :format="formatText"></t-progress>
    </div>
    <div class="progress-circle-container">
      <div class="progress-circle-item">
        <t-progress :percentage="50" type="circle" :format="formatText"></t-progress>
      </div>
      <div class="progress-circle-item">
        <t-progress :percentage="50" type="dashboard" :format="formatText"></t-progress>
      </div>
    </div>

    <h4>使用默认插槽</h4>
    <div class="progress-row">
      <t-progress :percentage="50">
        <template #default="data">
          <span class="custom-text">已完成 {{ data?.percentage }}%</span>
        </template>
      </t-progress>
    </div>

    <div class="progress-circle-container">
      <div class="progress-circle-item">
        <t-progress :percentage="50" type="circle">
          <template #default="data">
            <div class="custom-circle-content">
              <div class="value">{{ data?.percentage }}%</div>
              <div class="text">已完成</div>
            </div>
          </template>
        </t-progress>
      </div>

      <div class="progress-circle-item">
        <t-progress :percentage="50" type="dashboard">
          <template #default="data">
            <div class="custom-circle-content">
              <span class="icon">✓</span>
              <div class="value">{{ data?.percentage }}</div>
            </div>
          </template>
        </t-progress>
      </div>
    </div>
  </div>
</template>

<script setup>
// 自定义文本格式化
const formatText = percentage => {
  if (percentage < 30) {
    return "起步阶段";
  } else if (percentage < 70) {
    return "进行中";
  } else if (percentage < 100) {
    return "接近完成";
  } else {
    return "已完成!";
  }
};
</script>

<style scoped>
.progress-demo {
  width: 100%;
}

h4 {
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.progress-row {
  margin-bottom: 15px;
}

.progress-circle-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.progress-circle-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-text {
  color: #409eff;
  font-weight: bold;
}

.custom-circle-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.custom-circle-content .value {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.custom-circle-content .text {
  font-size: 12px;
  color: #909399;
}

.custom-circle-content .icon {
  font-size: 20px;
  color: #67c23a;
}
</style>
