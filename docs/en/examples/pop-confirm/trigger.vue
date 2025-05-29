<template>
  <div class="demo-container">
    <p class="demo-desc">
      Pop confirm supports multiple trigger configuration options. You can control the closing method of the pop confirm by setting the <code>close-on-press-escape</code> and <code>close-on-press-other</code> properties.
    </p>
    
    <div class="demo-block">
      <div class="trigger-section">
        <h4>Default Configuration</h4>
        <p class="trigger-desc">By default, the pop confirm can only be closed by clicking the confirm or cancel button.</p>
        <t-pop-confirm content="Default configuration confirm">
          <t-button type="primary">Default Config</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="trigger-section">
        <h4>Support ESC to Close</h4>
        <p class="trigger-desc">Setting <code>close-on-press-escape</code> to <code>true</code> allows closing the pop confirm by pressing the ESC key.</p>
        <t-pop-confirm 
          content="Press ESC key to close this confirm" 
          :close-on-press-escape="true"
        >
          <t-button type="primary">ESC Close</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="trigger-section">
        <h4>Click Other Area to Close</h4>
        <p class="trigger-desc">Setting <code>close-on-press-other</code> to <code>true</code> allows closing by clicking outside the pop confirm area.</p>
        <t-pop-confirm 
          content="Click outside this confirm area to close" 
          :close-on-press-other="true"
        >
          <t-button type="primary">Click Outside Close</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="trigger-section">
        <h4>Enable Both Methods</h4>
        <p class="trigger-desc">You can set multiple closing methods simultaneously to provide a more flexible interactive experience.</p>
        <t-pop-confirm 
          content="Press ESC key or click outside area to close" 
          :close-on-press-escape="true"
          :close-on-press-other="true"
        >
          <t-button type="primary">Combined Config</t-button>
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