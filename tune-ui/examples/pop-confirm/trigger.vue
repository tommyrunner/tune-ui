<template>
  <div class="demo-container">
    <p class="demo-desc">气泡确认框支持多种触发配置选项，可以通过设置 <code>close-on-press-escape</code> 和 <code>close-on-press-other</code> 属性来控制气泡确认框的关闭方式。</p>
    
    <div class="demo-block">
      <div class="trigger-section">
        <h4>默认配置</h4>
        <p class="trigger-desc">默认情况下，气泡确认框只能通过点击确认或取消按钮关闭。</p>
        <t-pop-confirm content="默认配置的确认框">
          <t-button type="primary">默认配置</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="trigger-section">
        <h4>支持ESC关闭</h4>
        <p class="trigger-desc">设置 <code>close-on-press-escape</code> 为 <code>true</code> 可以通过按ESC键关闭气泡确认框。</p>
        <t-pop-confirm 
          content="按ESC键可以关闭此确认框" 
          :close-on-press-escape="true"
        >
          <t-button type="primary">ESC关闭</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="trigger-section">
        <h4>点击其他区域关闭</h4>
        <p class="trigger-desc">设置 <code>close-on-press-other</code> 为 <code>true</code> 可以通过点击气泡确认框外部区域关闭。</p>
        <t-pop-confirm 
          content="点击此确认框外部区域可以关闭" 
          :close-on-press-other="true"
        >
          <t-button type="primary">点击其他关闭</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="trigger-section">
        <h4>同时启用两种方式</h4>
        <p class="trigger-desc">可以同时设置多种关闭方式，提供更灵活的交互体验。</p>
        <t-pop-confirm 
          content="按ESC键或点击外部区域均可关闭" 
          :close-on-press-escape="true"
          :close-on-press-other="true"
        >
          <t-button type="primary">组合配置</t-button>
        </t-pop-confirm>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 16px 0;
}

.demo-desc {
  margin: 0 0 20px;
  color: #606266;
  line-height: 1.6;
}

.demo-desc code, .trigger-desc code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

.demo-block {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.trigger-section {
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.trigger-section h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #303133;
}

.trigger-desc {
  margin: 0 0 12px;
  font-size: 13px;
  color: #606266;
  line-height: 1.5;
}
</style> 