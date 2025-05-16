<template>
  <div class="demo-container">
    <p class="demo-desc">将弹出框应用于一组元素，这些元素共享同一个弹出内容，适用于组合按钮等场景。</p>

    <div class="demo-block">
      <div class="group-section">
        <h4>按钮组弹出</h4>
        <t-popover content="这是按钮组的共享弹出内容">
          <t-button type="primary">按钮1</t-button>
          <t-button type="primary">按钮2</t-button>
          <t-button type="primary">按钮3</t-button>
        </t-popover>
      </div>

      <div class="group-section">
        <h4>菜单项弹出</h4>
        <t-popover content="这是菜单项的共享弹出内容">
          <div class="menu-item">菜单项一</div>
          <div class="menu-item">菜单项二</div>
          <div class="menu-item">菜单项三</div>
        </t-popover>
      </div>
    </div>

    <div class="tip-box">
      <p>提示：当一组元素需要共享同一个弹出内容时，可以将它们包装在同一个t-popover组件内部。</p>
    </div>
  </div>
</template>

<script setup>
import { TPopover, TButton } from "tune-ui";
</script>

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
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 16px;
}

.group-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h4 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.button-group {
  display: flex;
  gap: 0;
}

.button-group :deep(.t-button) {
  border-radius: 0;
  margin-right: -1px;
}

.button-group :deep(.t-button:first-child) {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.button-group :deep(.t-button:last-child) {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  margin-right: 0;
}

.menu-items {
  width: 200px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.menu-item {
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #606266;
}

.menu-item:hover {
  background-color: #f5f7fa;
}

.menu-item:not(:last-child) {
  border-bottom: 1px solid #ebeef5;
}

.tip-box {
  padding: 10px 16px;
  background-color: #f4f4f5;
  border-left: 4px solid #909399;
  color: #606266;
  font-size: 14px;
  border-radius: 4px;
}

.tip-box p {
  margin: 0;
  line-height: 1.6;
}
</style>
