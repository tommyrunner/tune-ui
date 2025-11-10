<template>
  <div class="progress-demo">
    <div class="progress-row">
      <t-progress :percentage="50" striped></t-progress>
      <div class="stripe-label">静态条纹</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" striped striped-flow></t-progress>
      <div class="stripe-label">动态条纹</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="100" striped striped-flow status="success"></t-progress>
      <div class="stripe-label">成功状态动态条纹</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" striped striped-flow status="warning"></t-progress>
      <div class="stripe-label">警告状态动态条纹</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" striped striped-flow status="exception"></t-progress>
      <div class="stripe-label">异常状态动态条纹</div>
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

.stripe-label {
  margin-left: 15px;
  color: #606266;
  font-size: 14px;
}
</style> 