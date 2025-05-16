<template>
  <div class="demo-container">
    <p class="demo-desc">可以自定义弹出框的宽度、圆角、内边距、阴影等样式，以满足不同的设计需求。</p>

    <div class="demo-block">
      <div class="style-section">
        <h4>自定义宽度和圆角</h4>
        <t-popover content="这是一个自定义宽度和圆角的弹出框" width="240px" :radius="[8, 8, 8, 8]">
          <t-button type="primary">宽度和圆角</t-button>
        </t-popover>
      </div>

      <div class="style-section">
        <h4>自定义内边距</h4>
        <t-popover content="这是一个自定义内边距的弹出框" :padding="[16, 20, 16, 20]">
          <t-button type="warning">内边距</t-button>
        </t-popover>
      </div>

      <div class="style-section">
        <h4>自定义阴影</h4>
        <t-popover content="这是一个自定义阴影的弹出框" :box-shadow="[0, 6, 16, 'rgba(0, 0, 0, 0.15)']">
          <t-button type="success">阴影</t-button>
        </t-popover>
      </div>

      <div class="style-section">
        <h4>无箭头样式</h4>
        <t-popover content="这是一个无箭头的弹出框" :show-arrow="false">
          <t-button type="info">无箭头</t-button>
        </t-popover>
      </div>

      <div class="style-section">
        <h4>自定义间距</h4>
        <t-popover content="这是一个自定义间距的弹出框" :gap="20">
          <t-button type="danger">间距</t-button>
        </t-popover>
      </div>
    </div>

    <div class="tip-box">
      <div class="tip-title">样式配置项：</div>
      <ul class="tip-list">
        <li><code>width</code>：设置弹出框宽度</li>
        <li><code>radius</code>：设置弹出框圆角</li>
        <li><code>padding</code>：设置弹出框内边距</li>
        <li><code>box-shadow</code>：设置弹出框阴影</li>
        <li><code>show-arrow</code>：控制是否显示箭头</li>
        <li><code>gap</code>：设置弹出框与触发元素的间距</li>
      </ul>
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
  margin-bottom: 24px;
}

.style-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h4 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.tip-box {
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}

.tip-title {
  margin-bottom: 12px;
  font-weight: 500;
  color: #303133;
  font-size: 14px;
}

.tip-list {
  margin: 0;
  padding-left: 16px;
  color: #606266;
  line-height: 1.8;
}

.tip-list li {
  margin-bottom: 8px;
}

.tip-list code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: monospace;
}
</style>
