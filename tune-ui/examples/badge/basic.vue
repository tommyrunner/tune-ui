<template>
  <div class="badge-demo">
    <t-badge :value="12">
      <div class="badge-box">消息提醒</div>
    </t-badge>

    <t-badge :value="5">
      <div class="badge-box">未读消息</div>
    </t-badge>

    <t-badge :value="0">
      <div class="badge-box">无徽章</div>
    </t-badge>
  </div>
</template>

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
}
</style>
