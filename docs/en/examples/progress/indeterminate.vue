<template>
  <div class="progress-demo">
    <div class="progress-row">
      <t-progress :percentage="50" indeterminate></t-progress>
      <div class="label">Default Indeterminate Progress</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" indeterminate :duration="2"></t-progress>
      <div class="label">Fast Animation (duration=2)</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" indeterminate :duration="5"></t-progress>
      <div class="label">Slow Animation (duration=5)</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" indeterminate color="#8e44ad"></t-progress>
      <div class="label">Custom Color</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" indeterminate :stroke-width="12"></t-progress>
      <div class="label">Thick Stroke</div>
    </div>
  </div>
</template>

<style scoped>
.progress-demo {
  width: 100%;
}

.progress-row {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.label {
  margin-left: 15px;
  color: #606266;
  font-size: 14px;
}
</style> 