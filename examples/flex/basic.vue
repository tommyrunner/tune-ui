<template>
  <div class="demo-container">
    <p class="demo-desc">使用 t-flex 和 t-flex-group 组件创建简单的弹性布局。</p>

    <div class="demo-block">
      <t-flex-group>
        <t-flex :span="5">
          <div class="flex-item">span: 5 (50%)</div>
        </t-flex>
        <t-flex :span="5">
          <div class="flex-item">span: 5 (50%)</div>
        </t-flex>
      </t-flex-group>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 16px 0;
}

.demo-desc {
  margin: 0 0 16px;
  color: #606266;
  line-height: 1.6;
}

.demo-block {
  margin-bottom: 24px;
}

.flex-item {
  padding: 16px;
  text-align: center;
  background-color: #e5edff;
  border: 1px solid #c6d9ff;
  border-radius: 4px;
}
</style> 