<template>
  <div class="badge-demo">
    <t-badge :value="12" :offsetX="10" :offsetY="10">
      <div class="badge-box">向右下偏移</div>
    </t-badge>
    
    <t-badge :value="12" :offsetX="-10" :offsetY="-10">
      <div class="badge-box">向左上偏移</div>
    </t-badge>
    
    <t-badge :value="12" :offsetX="20" :offsetY="0">
      <div class="badge-box">只在水平方向偏移</div>
    </t-badge>
    
    <t-badge :value="12" :offsetX="0" :offsetY="20">
      <div class="badge-box">只在垂直方向偏移</div>
    </t-badge>
  </div>
</template>

<script setup>
import { TBadge } from "tune-ui";
</script>

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