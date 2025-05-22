<template>
  <div class="demo-container">
    <p class="demo-desc">使用 sort 属性控制元素的显示顺序。</p>

    <div class="demo-block">
      <t-flex-group>
        <t-flex :span="3" :sort="3">
          <div class="flex-item">sort: 3</div>
        </t-flex>
        <t-flex :span="3" :sort="1">
          <div class="flex-item">sort: 1</div>
        </t-flex>
        <t-flex :span="3" :sort="2">
          <div class="flex-item">sort: 2</div>
        </t-flex>
      </t-flex-group>
    </div>

    <div class="demo-note">
      显示顺序: 1 → 2 → 3（无论在代码中的位置如何）
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
  margin-bottom: 16px;
}

.demo-note {
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-left: 3px solid #67c23a;
  color: #606266;
  margin-bottom: 24px;
  font-size: 14px;
}

.flex-item {
  padding: 16px;
  text-align: center;
  background-color: #e5edff;
  border: 1px solid #c6d9ff;
  border-radius: 4px;
}
</style> 