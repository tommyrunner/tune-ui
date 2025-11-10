<template>
  <div class="demo-container">
    <p class="demo-desc">The message component supports custom mount container and display position.</p>
    
    <div class="demo-block">
      <div class="custom-section">
        <h4>Custom Mount Container</h4>
        <p class="section-desc">Specify the DOM node where the message is mounted by setting the <code>appendTo</code> property</p>
        <t-button type="primary" @click="showCustomAppendMessage">Show in Custom Container</t-button>
        <div id="custom-append" class="custom-append">
          <p class="append-tip">Custom mount container, messages will be displayed here</p>
        </div>
      </div>
      
      <div class="custom-section">
        <h4>Custom Display Position</h4>
        <p class="section-desc">Specify the display coordinates of the message by setting the <code>custom</code> property</p>
        <div class="position-options">
          <t-button type="primary" @click="showCustomPosition('10%', '50px')">Top Left</t-button>
          <t-button type="primary" @click="showCustomPosition('90%', '50px')">Top Right</t-button>
          <t-button type="primary" @click="showCustomPosition('90%', '90%')">Bottom Right</t-button>
          <t-button type="primary" @click="showCustomPosition('10%', '90%')">Bottom Left</t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

/**
 * Show custom append message
 */
const showCustomAppendMessage = () => {
  TMessage.message("I am mounted in a custom container", "info", {
    appendTo: "#custom-append",
    isClose: true
  });
};

/**
 * Show custom position message
 */
const showCustomPosition = (x, y) => {
  TMessage.message(`My position is x: ${x}, y: ${y}`, "info", {
    custom: { x, y },
    isClose: true
  });
};
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
  flex-direction: column;
  gap: 36px;
}

.custom-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h4 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.section-desc {
  margin: 0 0 12px;
  color: #606266;
  font-size: 14px;
}

.section-desc code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: monospace;
}

.custom-append {
  margin-top: 16px;
  height: 100px;
  background-color: #f9fafb;
  border: 1px dashed #e5e7eb;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.append-tip {
  color: #909399;
  font-size: 14px;
}

.position-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style> 