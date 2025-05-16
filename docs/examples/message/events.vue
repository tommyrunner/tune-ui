<template>
  <div class="demo-container">
    <p class="demo-desc">消息提示组件提供了关闭回调事件，支持多条消息堆叠展示。</p>
    
    <div class="demo-block">
      <div class="events-section">
        <h4>关闭回调</h4>
        <t-button type="warning" @click="showCallbackMessage">显示带回调的消息</t-button>
      </div>
      
      <div class="events-section">
        <h4>多消息堆叠</h4>
        <t-button type="warning" @click="showMultipleMessage">显示多条堆叠消息</t-button>
      </div>
    </div>
    
    <div class="event-log" v-if="logs.length > 0">
      <div class="log-header">
        <h4>事件记录</h4>
        <t-button size="small" type="info" @click="clearLogs">清除记录</t-button>
      </div>
      <div class="log-content">
        <div v-for="(log, index) in logs" :key="index" class="log-item">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TMessage, TButton } from "tune-ui";

// 事件日志
const logs = ref([]);

/**
 * 添加日志
 */
const addLog = (message) => {
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  
  logs.value.unshift({
    time,
    message
  });
  
  // 限制日志数量
  if (logs.value.length > 5) {
    logs.value = logs.value.slice(0, 5);
  }
};

/**
 * 显示带回调的消息
 */
const showCallbackMessage = () => {
  TMessage.message("关闭此消息会触发回调", "info", {
    isClose: true,
    closeCallback: (id) => {
      addLog(`消息 ${id} 被关闭，触发了关闭回调`);
    }
  });
};

/**
 * 显示多条堆叠消息
 */
const showMultipleMessage = () => {
  ["info", "success", "warning", "danger"].forEach((type, index) => {
    setTimeout(() => {
      TMessage.message(`这是第 ${index + 1} 条堆叠消息`, type, {
        isClose: true,
        closeCallback: (id) => {
          addLog(`堆叠消息 ${id} 被关闭`);
        }
      });
      addLog(`显示了类型为 ${type} 的第 ${index + 1} 条堆叠消息`);
    }, index * 800);
  });
};

/**
 * 清除日志
 */
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

.events-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h4 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.event-log {
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

.log-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.log-item {
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.log-time {
  font-family: monospace;
  color: #909399;
  margin-right: 10px;
  font-size: 13px;
}

.log-message {
  color: #606266;
  font-size: 14px;
}
</style> 