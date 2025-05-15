<template>
  <div class="badge-demo">
    <t-badge :value="100" :max="99">
      <div class="badge-box">最大值99</div>
    </t-badge>
    
    <t-badge :value="35" :max="20">
      <div class="badge-box">最大值20</div>
    </t-badge>
    
    <t-badge :value="10" :max="10">
      <div class="badge-box">值等于最大值</div>
    </t-badge>
  </div>
</template>

<script setup>
import { TBadge } from "tune-ui";
</script>

<style scoped>
.badge-demo {
  display: flex;
  gap: 40px;
}

.badge-box {
  width: 100px;
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