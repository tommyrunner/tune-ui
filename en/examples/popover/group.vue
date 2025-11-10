<template>
  <div class="demo-container">
    <p class="demo-desc">
      Apply popover to a group of elements that share the same popup content, suitable for scenarios like button groups.
    </p>

    <div class="demo-block">
      <div class="group-section">
        <h4>Button Group Popup</h4>
        <t-popover content="This is the shared popup content for the button group">
          <t-button type="primary">Button 1</t-button>
          <t-button type="primary">Button 2</t-button>
          <t-button type="primary">Button 3</t-button>
        </t-popover>
      </div>

      <div class="group-section">
        <h4>Menu Item Popup</h4>
        <t-popover content="This is the shared popup content for menu items">
          <div class="menu-item">Menu Item One</div>
          <div class="menu-item">Menu Item Two</div>
          <div class="menu-item">Menu Item Three</div>
        </t-popover>
      </div>
    </div>

    <div class="tip-box">
      <p>
        Tip: When a group of elements need to share the same popup content, you can wrap them inside the same t-popover component.
      </p>
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
