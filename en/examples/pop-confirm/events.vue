<template>
  <div class="demo-container">
    <p class="demo-desc">The pop confirm component provides <code>confirm</code> and <code>cancel</code> events for handling user confirmation and cancellation operations.</p>
    
    <div class="event-demo">
      <t-pop-confirm 
        content="Are you sure you want to perform this operation?" 
        @confirm="handleConfirm" 
        @cancel="handleCancel"
      >
        <t-button type="primary">Trigger Event</t-button>
      </t-pop-confirm>
      
      <div class="event-log" v-if="logs.length > 0">
        <h4>Event Log</h4>
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
            <t-button size="small" type="info" @click="clearLogs">Clear Log</t-button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="event-info">
      <h4>Event Description</h4>
      <ul>
        <li><code>confirm</code> event: Triggered when the user clicks the confirm button</li>
        <li><code>cancel</code> event: Triggered when the user clicks the cancel button</li>
      </ul>
      <p class="usage-tip">These events can be used to execute corresponding business logic, such as sending requests, updating state, etc.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// Event logs
const logs = ref([]);

/**
 * Add log
 */
const addLog = (type, message) => {
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  
  logs.value.unshift({
    type,
    time,
    message
  });
  
  // Limit log count
  if (logs.value.length > 5) {
    logs.value = logs.value.slice(0, 5);
  }
};

/**
 * Handle confirm event
 */
const handleConfirm = () => {
  addLog("confirm", "User clicked the confirm button");
};

/**
 * Handle cancel event
 */
const handleCancel = () => {
  addLog("cancel", "User clicked the cancel button");
};

/**
 * Clear logs
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