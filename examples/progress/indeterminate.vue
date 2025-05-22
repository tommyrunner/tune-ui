<template>
  <div class="progress-demo">
    <div class="progress-row">
      <t-progress :percentage="50" indeterminate></t-progress>
      <div class="label">默认不确定进度</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" indeterminate :duration="2"></t-progress>
      <div class="label">快速动画 (duration=2)</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" indeterminate :duration="5"></t-progress>
      <div class="label">缓慢动画 (duration=5)</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" indeterminate color="#8e44ad"></t-progress>
      <div class="label">自定义颜色</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" indeterminate :stroke-width="12"></t-progress>
      <div class="label">粗线条</div>
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