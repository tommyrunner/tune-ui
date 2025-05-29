<template>
  <div class="color-picker-demo">
    <t-color-picker 
      v-model="color" 
      show-alpha
      @change="handleChange"
      @active-change="handleActiveChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    
    <div class="color-preview" :style="{ backgroundColor: color }">
      {{ color }}
    </div>
    
    <div class="event-log">
      <div class="event-log-title">Event Log:</div>
      <div class="event-log-content">
        <div v-for="(log, index) in logs" :key="index" class="event-log-item">
          <span class="event-log-time">{{ log.time }}</span>
          <span :class="['event-log-type', `event-log-type--${log.type}`]">{{ log.type }}</span>
          <span class="event-log-message">{{ log.message }}</span>
        </div>
        <div v-if="!logs.length" class="event-log-empty">No events</div>
      </div>
      <t-button size="small" @click="clearLogs">Clear Log</t-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Default color value
const color = ref("rgba(64, 158, 255, 0.8)");

// Event logs
const logs = ref([]);

// Clear logs
const clearLogs = () => {
  logs.value = [];
};

// Add log
const addLog = (type, message) => {
  const time = new Date().toLocaleTimeString();
  logs.value.unshift({ type, message, time });
  
  // Keep maximum 10 logs
  if (logs.value.length > 10) {
    logs.value.pop();
  }
};

// Event handlers
const handleChange = (value) => {
  addLog("change", `Color value changed to: ${value}`);
};

const handleActiveChange = (value) => {
  addLog("active", `Panel active color: ${value}`);
};

const handleFocus = () => {
  addLog("focus", "Color picker gained focus");
};

const handleBlur = () => {
  addLog("blur", "Color picker lost focus");
};
</script>

<style scoped>
.color-picker-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.color-preview {
  padding: 10px 15px;
  border-radius: 4px;
  width: 300px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  text-shadow: 0 0 2px rgba(0,0,0,0.5);
}

.event-log {
  margin-top: 8px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 12px;
}

.event-log-title {
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #606266;
}

.event-log-content {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 12px;
  min-height: 150px;
  max-height: 200px;
  overflow-y: auto;
}

.event-log-item {
  padding: 6px 0;
  margin-bottom: 6px;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  display: flex;
  align-items: center;
}

.event-log-time {
  color: #909399;
  margin-right: 8px;
  font-size: 12px;
}

.event-log-type {
  border-radius: 2px;
  padding: 2px 6px;
  margin-right: 8px;
  font-size: 12px;
}

.event-log-type--change {
  background-color: #ecf5ff;
  color: #409eff;
}

.event-log-type--active {
  background-color: #f0f9eb;
  color: #67c23a;
}

.event-log-type--focus {
  background-color: #f4f4f5;
  color: #909399;
}

.event-log-type--blur {
  background-color: #fdf6ec;
  color: #e6a23c;
}

.event-log-message {
  flex: 1;
  word-break: break-all;
}

.event-log-empty {
  color: #909399;
  font-size: 14px;
  text-align: center;
  padding: 30px 0;
}
</style> 