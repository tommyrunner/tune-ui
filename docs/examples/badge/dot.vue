<template>
  <div class="badge-demo">
    <t-badge :value="1" isDot>
      <div class="badge-box">红点徽章</div>
    </t-badge>

    <t-badge :value="1" isDot color="#1890ff">
      <div class="badge-box">蓝色红点</div>
    </t-badge>

    <t-badge :value="1" isDot color="#52c41a">
      <div class="badge-box">绿色红点</div>
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
