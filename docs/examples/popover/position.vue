<template>
  <div class="demo-container">
    <p class="demo-desc">弹出框支持四个方向弹出，可以根据页面空间选择合适的弹出方向。</p>

    <div class="demo-block">
      <div class="position-demo">
        <div class="position-row">
          <div class="position-cell"></div>
          <div class="position-cell">
            <t-popover content="顶部弹出" position="top">
              <t-button>上</t-button>
            </t-popover>
          </div>
          <div class="position-cell"></div>
        </div>

        <div class="position-row">
          <div class="position-cell">
            <t-popover content="左侧弹出" position="left">
              <t-button>左</t-button>
            </t-popover>
          </div>
          <div class="position-cell position-center">
            <span>弹出位置</span>
          </div>
          <div class="position-cell">
            <t-popover content="右侧弹出" position="right">
              <t-button>右</t-button>
            </t-popover>
          </div>
        </div>

        <div class="position-row">
          <div class="position-cell"></div>
          <div class="position-cell">
            <t-popover content="底部弹出" position="bottom">
              <t-button>下</t-button>
            </t-popover>
          </div>
          <div class="position-cell"></div>
        </div>
      </div>

      <div class="position-info">
        <h4>应用场景</h4>
        <ul>
          <li><strong>top（上）</strong>：适用于按钮位于底部区域的场景</li>
          <li><strong>right（右）</strong>：适用于按钮位于左侧区域的场景</li>
          <li><strong>bottom（下）</strong>：适用于按钮位于顶部区域的场景</li>
          <li><strong>left（左）</strong>：适用于按钮位于右侧区域的场景</li>
        </ul>
        <p class="position-tip">通过 <code>position</code> 属性设置弹出位置</p>
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
