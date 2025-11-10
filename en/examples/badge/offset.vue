<template>
  <div class="badge-demo">
    <t-badge :value="12" :offsetX="10" :offsetY="10">
      <div class="badge-box">Offset Right Down</div>
    </t-badge>

    <t-badge :value="12" :offsetX="-10" :offsetY="-10">
      <div class="badge-box">Offset Left Up</div>
    </t-badge>

    <t-badge :value="12" :offsetX="20" :offsetY="0">
      <div class="badge-box">Horizontal Offset Only</div>
    </t-badge>

    <t-badge :value="12" :offsetX="0" :offsetY="20">
      <div class="badge-box">Vertical Offset Only</div>
    </t-badge>
  </div>
</template>

<style scoped>
.badge-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 20px;
}

.badge-box {
  width: 120px;
  height: 100px;
  background: #f0f0f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #606266;
  text-align: center;
}
</style>
