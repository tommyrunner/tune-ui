<template>
  <div class="progress-demo">
    <div class="progress-row">
      <t-progress :percentage="50"></t-progress>
      <div class="status-label">默认</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="100" status="success"></t-progress>
      <div class="status-label">成功</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" status="warning"></t-progress>
      <div class="status-label">警告</div>
    </div>
    <div class="progress-row">
      <t-progress :percentage="50" status="exception"></t-progress>
      <div class="status-label">异常</div>
    </div>
  </div>
</template>

<script setup>
import { TProgress } from "tune-ui";
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

.status-label {
  margin-left: 15px;
  color: #606266;
  font-size: 14px;
}
</style> 