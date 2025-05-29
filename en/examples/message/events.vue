<template>
  <div class="demo-container">
    <p class="demo-desc">The message component provides close callback events and supports multiple message stacking display.</p>
    
    <div class="demo-block">
      <div class="events-section">
        <h4>Close Callback</h4>
        <t-button type="warning" @click="showCallbackMessage">Show Message with Callback</t-button>
      </div>
      
      <div class="events-section">
        <h4>Multiple Message Stacking</h4>
        <t-button type="warning" @click="showMultipleMessage">Show Multiple Stacked Messages</t-button>
      </div>
    </div>
    
    <div class="event-log" v-if="logs.length > 0">
      <div class="log-header">
        <h4>Event Log</h4>
        <t-button size="small" type="info" @click="clearLogs">Clear Log</t-button>
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


// Event logs
const logs = ref([]);

/**
 * Add log
 */
const addLog = message => {
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  
  logs.value.unshift({
    time,
    message
  });
  
  // Limit log count
  if (logs.value.length > 5) {
    logs.value = logs.value.slice(0, 5);
  }
};

/**
 * Show message with callback
 */
const showCallbackMessage = () => {
  TMessage.message("Closing this message will trigger a callback", "info", {
    isClose: true,
    closeCallback: id => {
      addLog(`Message ${id} was closed, triggered close callback`);
    }
  });
};

/**
 * Show multiple stacked messages
 */
const showMultipleMessage = () => {
  ["info", "success", "warning", "danger"].forEach((type, index) => {
    setTimeout(() => {
      TMessage.message(`This is the ${index + 1} stacked message`, type, {
        isClose: true,
        closeCallback: id => {
          addLog(`Stacked message ${id} was closed`);
        }
      });
      addLog(`Displayed ${type} type message ${index + 1} in stack`);
    }, index * 800);
  });
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