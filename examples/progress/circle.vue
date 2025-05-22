<template>
  <div class="progress-demo">
    <div class="progress-circle-container">
      <div class="progress-circle-item">
        <t-progress :percentage="25" type="circle"></t-progress>
      </div>
      <div class="progress-circle-item">
        <t-progress :percentage="50" type="circle"></t-progress>
      </div>
      <div class="progress-circle-item">
        <t-progress :percentage="75" type="circle"></t-progress>
      </div>
      <div class="progress-circle-item">
        <t-progress :percentage="100" type="circle" status="success"></t-progress>
      </div>
    </div>
    <div class="progress-circle-container">
      <div class="progress-circle-item">
        <t-progress :percentage="75" type="circle" status="warning"></t-progress>
      </div>
      <div class="progress-circle-item">
        <t-progress :percentage="75" type="circle" status="exception"></t-progress>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-demo {
  width: 100%;
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