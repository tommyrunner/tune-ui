<template>
  <div class="badge-demo">
    <t-badge :value="12" color="#1890ff">
      <div class="badge-box">Blue Badge</div>
    </t-badge>

    <t-badge :value="12" color="#52c41a">
      <div class="badge-box">Green Badge</div>
    </t-badge>

    <t-badge :value="12" color="#722ed1">
      <div class="badge-box">Purple Badge</div>
    </t-badge>

    <t-badge :value="12" color="#faad14">
      <div class="badge-box">Yellow Badge</div>
    </t-badge>
  </div>
</template>

<style scoped>
.badge-demo {
  display: flex;
  flex-wrap: wrap;
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
