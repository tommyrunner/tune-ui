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
      <div class="event-log-title">事件日志:</div>
      <div class="event-log-content">
        <div v-for="(log, index) in logs" :key="index" class="event-log-item">
          <span class="event-log-time">{{ log.time }}</span>
          <span :class="['event-log-type', `event-log-type--${log.type}`]">{{ log.type }}</span>
          <span class="event-log-message">{{ log.message }}</span>
        </div>
        <div v-if="!logs.length" class="event-log-empty">暂无事件</div>
      </div>
      <t-button size="small" @click="clearLogs">清空日志</t-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// 默认颜色值
const color = ref("rgba(64, 158, 255, 0.8)");

// 事件日志
const logs = ref([]);

// 清空日志
const clearLogs = () => {
  logs.value = [];
};

// 添加日志
const addLog = (type, message) => {
  const time = new Date().toLocaleTimeString();
  logs.value.unshift({ type, message, time });
  
  // 最多保留10条日志
  if (logs.value.length > 10) {
    logs.value.pop();
  }
};

// 事件处理函数
const handleChange = (value) => {
  addLog("change", `颜色值变更为: ${value}`);
};

const handleActiveChange = (value) => {
  addLog("active", `面板活动颜色: ${value}`);
};

const handleFocus = () => {
  addLog("focus", "颜色选择器获得焦点");
};

const handleBlur = () => {
  addLog("blur", "颜色选择器失去焦点");
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