<template>
  <div class="demo-container">
    <p class="demo-desc">
      The popover supports four directions for popup, you can choose the appropriate popup direction based on page space.
    </p>

    <div class="demo-block">
      <div class="position-demo">
        <div class="position-row">
          <div class="position-cell"></div>
          <div class="position-cell">
            <t-popover content="Top popup" position="top">
              <t-button>Top</t-button>
            </t-popover>
          </div>
          <div class="position-cell"></div>
        </div>

        <div class="position-row">
          <div class="position-cell">
            <t-popover content="Left popup" position="left">
              <t-button>Left</t-button>
            </t-popover>
          </div>
          <div class="position-cell position-center">
            <span>Popup Position</span>
          </div>
          <div class="position-cell">
            <t-popover content="Right popup" position="right">
              <t-button>Right</t-button>
            </t-popover>
          </div>
        </div>

        <div class="position-row">
          <div class="position-cell"></div>
          <div class="position-cell">
            <t-popover content="Bottom popup" position="bottom">
              <t-button>Bottom</t-button>
            </t-popover>
          </div>
          <div class="position-cell"></div>
        </div>
      </div>

      <div class="position-info">
        <h4>Application Scenarios</h4>
        <ul>
          <li><strong>top</strong>: Suitable for scenarios where the button is located in the bottom area</li>
          <li><strong>right</strong>: Suitable for scenarios where the button is located in the left area</li>
          <li><strong>bottom</strong>: Suitable for scenarios where the button is located in the top area</li>
          <li><strong>left</strong>: Suitable for scenarios where the button is located in the right area</li>
        </ul>
        <p class="position-tip">Set popup position through the <code>position</code> property</p>
      </div>
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
  gap: 36px;
}

.position-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.position-row {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.position-cell {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.position-center {
  background-color: #f5f7fa;
  border-radius: 4px;
  color: #909399;
  font-size: 14px;
}

.position-info {
  max-width: 300px;
}

.position-info h4 {
  margin: 0 0 12px;
  font-size: 16px;
  color: #303133;
}

.position-info ul {
  margin: 0 0 12px;
  padding-left: 20px;
  color: #606266;
  line-height: 1.8;
}

.position-info li {
  margin-bottom: 8px;
}

.position-info strong {
  color: #303133;
}

.position-tip {
  margin: 12px 0 0;
  font-size: 13px;
  color: #909399;
}

.position-tip code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: monospace;
}
</style>
