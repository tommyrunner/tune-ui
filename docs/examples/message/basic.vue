<template>
  <div class="demo-container">
    <p class="demo-desc">消息提示组件提供了四种不同类型，用于不同场景下的反馈。</p>
    
    <div class="demo-block">
      <t-button type="info" @click="showInfoMessage">信息消息</t-button>
      <t-button type="success" @click="showSuccessMessage">成功消息</t-button>
      <t-button type="warning" @click="showWarningMessage">警告消息</t-button>
      <t-button type="danger" @click="showDangerMessage">错误消息</t-button>
    </div>
  </div>
</template>

<script setup>
import { TMessage, TButton } from "tune-ui";

/**
 * 显示信息消息
 */
const showInfoMessage = () => {
  TMessage.message("这是一条信息消息", "info");
};

/**
 * 显示成功消息
 */
const showSuccessMessage = () => {
  TMessage.message("这是一条成功消息", "success");
};

/**
 * 显示警告消息
 */
const showWarningMessage = () => {
  TMessage.message("这是一条警告消息", "warning");
};

/**
 * 显示错误消息
 */
const showDangerMessage = () => {
  TMessage.message("这是一条错误消息", "danger");
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
}
</style> 