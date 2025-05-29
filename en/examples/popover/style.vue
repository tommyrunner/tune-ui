<template>
  <div class="demo-container">
    <p class="demo-desc">
      You can customize the width, border radius, padding, shadow and other styles of the popover to meet different design
      requirements.
    </p>

    <div class="demo-block">
      <div class="style-section">
        <h4>Custom Width and Border Radius</h4>
        <t-popover content="This is a popover with custom width and border radius" width="240px" :radius="[8, 8, 8, 8]">
          <t-button type="primary">Width & Radius</t-button>
        </t-popover>
      </div>

      <div class="style-section">
        <h4>Custom Padding</h4>
        <t-popover content="This is a popover with custom padding" :padding="[16, 20, 16, 20]">
          <t-button type="warning">Padding</t-button>
        </t-popover>
      </div>

      <div class="style-section">
        <h4>Custom Shadow</h4>
        <t-popover content="This is a popover with custom shadow" :box-shadow="[0, 6, 16, 'rgba(0, 0, 0, 0.15)']">
          <t-button type="success">Shadow</t-button>
        </t-popover>
      </div>

      <div class="style-section">
        <h4>No Arrow Style</h4>
        <t-popover content="This is a popover without arrow" :show-arrow="false">
          <t-button type="info">No Arrow</t-button>
        </t-popover>
      </div>

      <div class="style-section">
        <h4>Custom Gap</h4>
        <t-popover content="This is a popover with custom gap" :gap="20">
          <t-button type="danger">Gap</t-button>
        </t-popover>
      </div>
    </div>

    <div class="tip-box">
      <div class="tip-title">Style Configuration Options:</div>
      <ul class="tip-list">
        <li><code>width</code>: Set popover width</li>
        <li><code>radius</code>: Set popover border radius</li>
        <li><code>padding</code>: Set popover padding</li>
        <li><code>box-shadow</code>: Set popover shadow</li>
        <li><code>show-arrow</code>: Control whether to show arrow</li>
        <li><code>gap</code>: Set gap between popover and trigger element</li>
      </ul>
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
