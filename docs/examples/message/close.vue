<template>
  <div class="demo-container">
    <p class="demo-desc">消息提示支持多种关闭方式配置，包括手动关闭、ESC键关闭和自动关闭。</p>
    
    <div class="demo-block">
      <t-button type="info" @click="showManualCloseMessage">手动关闭</t-button>
      <t-button type="info" @click="showEscCloseMessage">ESC键关闭</t-button>
      <t-button type="info" @click="showAutoCloseMessage">自动关闭(3秒)</t-button>
    </div>
    
    <div class="tip-box">
      <p class="tip-title">提示：</p>
      <ul class="tip-list">
        <li>手动关闭：设置 <code>duration: 0</code> 和 <code>isClose: true</code> 实现永久显示并手动关闭</li>
        <li>ESC键关闭：设置 <code>closeOnPressEscape: true</code> 开启ESC键关闭功能</li>
        <li>自动关闭：设置 <code>duration</code> 为指定的毫秒数实现自动关闭</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { TMessage, TButton } from "tune-ui";

/**
 * 显示手动关闭消息
 */
const showManualCloseMessage = () => {
  TMessage.message("点击右侧关闭按钮可以关闭此消息", "info", {
    duration: 0,
    isClose: true
  });
};

/**
 * 显示ESC关闭消息
 */
const showEscCloseMessage = () => {
  TMessage.message("按ESC键可以关闭此消息", "info", {
    duration: 0,
    closeOnPressEscape: true
  });
};

/**
 * 显示自动关闭消息
 */
const showAutoCloseMessage = () => {
  TMessage.message("此消息将在3秒后自动关闭", "info", {
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