<template>
  <div class="progress-demo">
    <h4>Using format Property</h4>
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

    <h4>Using Default Slot</h4>
    <div class="progress-row">
      <t-progress :percentage="50">
        <template #default="data">
          <span class="custom-text">Completed {{ data?.percentage }}%</span>
        </template>
      </t-progress>
    </div>

    <div class="progress-circle-container">
      <div class="progress-circle-item">
        <t-progress :percentage="50" type="circle">
          <template #default="data">
            <div class="custom-circle-content">
              <div class="value">{{ data?.percentage }}%</div>
              <div class="text">Completed</div>
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
// Custom text formatting
const formatText = percentage => {
  if (percentage < 30) {
    return "Starting";
  } else if (percentage < 70) {
    return "In Progress";
  } else if (percentage < 100) {
    return "Nearly Done";
  } else {
    return "Completed!";
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
