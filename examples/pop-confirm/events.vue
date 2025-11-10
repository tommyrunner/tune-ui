<template>
  <div class="demo-container">
    <p class="demo-desc">气泡确认框组件提供了 <code>confirm</code> 和 <code>cancel</code> 事件，用于处理用户的确认和取消操作。</p>
    
    <div class="event-demo">
      <t-pop-confirm 
        content="确定要执行此操作吗？" 
        @confirm="handleConfirm" 
        @cancel="handleCancel"
      >
        <t-button type="primary">触发事件</t-button>
      </t-pop-confirm>
      
      <div class="event-log" v-if="logs.length > 0">
        <h4>事件记录</h4>
        <div class="log-container">
          <div 
            v-for="(log, index) in logs" 
            :key="index" 
            class="log-item"
            :class="{ 'log-confirm': log.type === 'confirm', 'log-cancel': log.type === 'cancel' }"
          >
            <span class="log-time">{{ log.time }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
          <div class="log-action">
            <t-button size="small" type="info" @click="clearLogs">清除记录</t-button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="event-info">
      <h4>事件说明</h4>
      <ul>
        <li><code>confirm</code> 事件：当用户点击确认按钮时触发</li>
        <li><code>cancel</code> 事件：当用户点击取消按钮时触发</li>
      </ul>
      <p class="usage-tip">这些事件可以用于执行相应的业务逻辑，如发送请求、更新状态等。</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// 事件日志
const logs = ref([]);

/**
 * 添加日志
 */
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

/**
 * 处理确认事件
 */
const handleConfirm = () => {
  addLog("confirm", "用户点击了确认按钮");
};

/**
 * 处理取消事件
 */
const handleCancel = () => {
  addLog("cancel", "用户点击了取消按钮");
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

.demo-desc code, .event-info code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

.event-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.event-log {
  margin-top: 8px;
}

.event-log h4 {
  margin: 0 0 12px;
  font-size: 14px;
  color: #303133;
}

.log-container {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.log-item {
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  color: #606266;
}

.log-confirm {
  background-color: #f0f9eb;
  border-left: 3px solid #67c23a;
}

.log-cancel {
  background-color: #fdf6ec;
  border-left: 3px solid #e6a23c;
}

.log-time {
  font-family: monospace;
  margin-right: 12px;
  color: #909399;
  font-size: 12px;
}

.log-message {
  flex: 1;
}

.log-action {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.event-info {
  background-color: #f5f7fa;
  padding: 16px;
  border-radius: 4px;
}

.event-info h4 {
  margin: 0 0 12px;
  font-size: 14px;
  color: #303133;
}

.event-info ul {
  margin: 0 0 12px;
  padding-left: 20px;
  color: #606266;
  line-height: 1.6;
}

.usage-tip {
  margin: 0;
  font-size: 12px;
  color: #909399;
  font-style: italic;
}
</style> 