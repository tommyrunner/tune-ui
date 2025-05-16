<template>
  <div class="demo-container">
    <p class="demo-desc">弹出框组件提供了多种事件，用于监听鼠标进入、离开、显示状态变化等。</p>
    <div class="demo-block">
      <div class="event-section">
        <t-popover
          content="触发事件测试"
          type="click"
          @hover-enter="handleHoverEnter"
          @hover-out="handleHoverOut"
          @model-change="handleModelChange"
          @open="handleOpen"
          @close="handleClose"
        >
          <t-button type="primary">事件测试</t-button>
        </t-popover>
      </div>

      <div class="event-log" v-if="logs.length > 0">
        <div class="log-header">
          <h4>事件记录</h4>
          <t-button size="small" type="info" @click="clearLogs">清除记录</t-button>
        </div>
        <div class="log-list">
          <div v-for="(log, index) in logs" :key="index" class="log-item" :class="getLogClass(log.type)">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-type">{{ log.type }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="event-info">
      <h4>支持的事件</h4>
      <ul>
        <li><code>hover-enter</code>：鼠标进入触发元素时触发</li>
        <li><code>hover-out</code>：鼠标离开触发元素时触发</li>
        <li><code>model-change</code>：弹出框显示状态变化时触发</li>
        <li><code>open</code>：弹出框打开时触发</li>
        <li><code>close</code>：弹出框关闭时触发</li>
        <li><code>click-model</code>：点击遮罩层时触发（在有遮罩层时有效）</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TPopover, TButton } from "tune-ui";

// 事件日志
const logs = ref([]);

// 添加日志
const addLog = (type, message) => {
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

  logs.value.unshift({
    type,
    time,
    message
  });

  // 限制日志数量
  if (logs.value.length > 5) {
    logs.value = logs.value.slice(0, 5);
  }
};

// 获取日志样式类
const getLogClass = type => {
  const classMap = {
    "hover-enter": "log-hover-enter",
    "hover-out": "log-hover-out",
    "model-change": "log-model-change",
    open: "log-open",
    close: "log-close"
  };
  return classMap[type] || "";
};

// 事件处理函数
const handleHoverEnter = () => {
  addLog("hover-enter", "鼠标进入触发元素");
};

const handleHoverOut = () => {
  addLog("hover-out", "鼠标离开触发元素");
};

const handleModelChange = () => {
  addLog("model-change", "弹出框显示状态发生变化");
};

const handleOpen = () => {
  addLog("open", "弹出框被打开");
};

const handleClose = () => {
  addLog("close", "弹出框被关闭");
};

// 清除日志
const clearLogs = () => {
  logs.value = [];
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
  gap: 24px;
  margin-bottom: 24px;
}

.event-section {
  min-width: 120px;
}

.event-log {
  flex: 1;
  min-width: 280px;
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.log-header h4 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.log-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.log-item {
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 4px;
  border-left: 3px solid #909399;
  display: flex;
  align-items: center;
}

.log-time {
  font-family: monospace;
  color: #909399;
  margin-right: 10px;
  font-size: 12px;
  width: 80px;
}

.log-type {
  font-weight: 500;
  margin-right: 10px;
  color: #409eff;
  width: 100px;
}

.log-message {
  color: #606266;
}

.log-hover-enter {
  border-left-color: #409eff;
}

.log-hover-out {
  border-left-color: #67c23a;
}

.log-model-change {
  border-left-color: #e6a23c;
}

.log-open {
  border-left-color: #67c23a;
}

.log-close {
  border-left-color: #f56c6c;
}

.event-info {
  width: 100%;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}

.event-info h4 {
  margin: 0 0 12px;
  font-size: 16px;
  color: #303133;
}

.event-info ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
  line-height: 1.8;
}

.event-info li {
  margin-bottom: 8px;
}

.event-info code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: monospace;
}
</style>
