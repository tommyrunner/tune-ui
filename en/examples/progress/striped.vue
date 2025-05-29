<template>
  <div class="progress-demo">
    <div class="progress-row">
      <t-progress :percentage="50" striped></t-progress>
      <div class="stripe-label">Static Stripes</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" striped striped-flow></t-progress>
      <div class="stripe-label">Animated Stripes</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="100" striped striped-flow status="success"></t-progress>
      <div class="stripe-label">Success Animated Stripes</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" striped striped-flow status="warning"></t-progress>
      <div class="stripe-label">Warning Animated Stripes</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" striped striped-flow status="exception"></t-progress>
      <div class="stripe-label">Exception Animated Stripes</div>
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