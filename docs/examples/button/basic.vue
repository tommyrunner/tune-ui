<template>
  <div class="button-demo">
    <!-- 基础类型按钮 -->
    <div class="button-row">
      <t-button>默认按钮</t-button>
      <t-button type="primary">主要按钮</t-button>
      <t-button type="success">成功按钮</t-button>
      <t-button type="info">信息按钮</t-button>
      <t-button type="warning">警告按钮</t-button>
      <t-button type="danger">危险按钮</t-button>
      <t-button type="text">文本按钮</t-button>
    </div>
  </div>
</template>

<style scoped>
.button-demo {
  padding: 16px 0;
}
.button-row {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
