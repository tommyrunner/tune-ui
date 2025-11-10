<template>
  <div class="demo-container">
    <p class="demo-desc">
      Message supports multiple closing methods configuration, including manual close, ESC key close and auto close.
    </p>

    <div class="demo-block">
      <t-button type="info" @click="showManualCloseMessage">Manual Close</t-button>
      <t-button type="info" @click="showEscCloseMessage">ESC Key Close</t-button>
      <t-button type="info" @click="showAutoCloseMessage">Auto Close (3s)</t-button>
    </div>

    <div class="tip-box">
      <p class="tip-title">Tips:</p>
      <ul class="tip-list">
        <li>
          Manual Close: Set <code>duration: 0</code> and <code>isClose: true</code> to display permanently and close manually
        </li>
        <li>ESC Key Close: Set <code>closeOnPressEscape: true</code> to enable ESC key close function</li>
        <li>Auto Close: Set <code>duration</code> to specified milliseconds to achieve auto close</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
/**
 * Show manual close message
 */
const showManualCloseMessage = () => {
  TMessage.message("Click the close button on the right to close this message", "info", {
    duration: 0,
    isClose: true
  });
};

/**
 * Show ESC close message
 */
const showEscCloseMessage = () => {
  TMessage.message("Press ESC key to close this message", "info", {
    duration: 0,
    closeOnPressEscape: true
  });
};

/**
 * Show auto close message
 */
const showAutoCloseMessage = () => {
  TMessage.message("This message will auto close after 3 seconds", "info", {
    duration: 3000
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
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.tip-box {
  margin-top: 24px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}

.tip-title {
  margin: 0 0 12px 0;
  font-weight: 500;
  color: #303133;
}

.tip-list {
  margin: 0;
  padding-left: 16px;
  color: #606266;
  line-height: 1.8;
}

.tip-list code {
  background-color: #eef1f6;
  padding: 2px 5px;
  border-radius: 3px;
  color: #409eff;
  font-family: monospace;
}
</style> 