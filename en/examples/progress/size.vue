<template>
  <div class="progress-demo">
    <h4>Linear Progress Bar Thickness</h4>
    <div class="progress-row">
      <t-progress :percentage="50" :stroke-width="6"></t-progress>
      <div class="size-label">Default height 6px</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" :stroke-width="12"></t-progress>
      <div class="size-label">Height 12px</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" :stroke-width="18"></t-progress>
      <div class="size-label">Height 18px</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" :stroke-width="24"></t-progress>
      <div class="size-label">Height 24px</div>
    </div>

    <h4>Circle Progress Bar Size</h4>
    <div class="progress-circle-container">
      <div class="progress-circle-item">
        <t-progress :percentage="75" type="circle" :width="80"></t-progress>
        <div class="size-label">80px</div>
      </div>
      <div class="progress-circle-item">
        <t-progress :percentage="75" type="circle" :width="100"></t-progress>
        <div class="size-label">100px</div>
      </div>
      <div class="progress-circle-item">
        <t-progress :percentage="75" type="circle" :width="120"></t-progress>
        <div class="size-label">120px</div>
      </div>
    </div>

    <h4>Circle Progress Bar Thickness</h4>
    <div class="progress-circle-container">
      <div class="progress-circle-item">
        <t-progress :percentage="50" type="circle" :stroke-width="3"></t-progress>
        <div class="size-label">strokeWidth: 3px</div>
      </div>
      <div class="progress-circle-item">
        <t-progress :percentage="50" type="circle" :stroke-width="6"></t-progress>
        <div class="size-label">strokeWidth: 6px (default)</div>
      </div>
      <div class="progress-circle-item">
        <t-progress :percentage="50" type="circle" :stroke-width="10"></t-progress>
        <div class="size-label">strokeWidth: 10px</div>
      </div>
    </div>
  </div>
</template>

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
  display: flex;
  align-items: center;
}

.size-label {
  margin-left: 15px;
  color: #606266;
  font-size: 14px;
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
</style> 