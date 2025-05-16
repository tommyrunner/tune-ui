<template>
  <div class="switch-demo">
    <div class="event-section">
      <div class="event-label">监听change事件：</div>
      <t-switch v-model="switchValue" @change="handleChange"></t-switch>

      <div class="event-log">
        <div>事件日志：</div>
        <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
          {{ log }}
        </div>
        <button class="clear-btn" @click="clearLogs">清除日志</button>
      </div>
    </div>

    <div class="event-section">
      <div class="event-label">当前值：{{ switchValue ? "开启" : "关闭" }}</div>
      <div class="event-controls">
        <button class="action-btn" @click="switchValue = true">通过代码开启</button>
        <button class="action-btn" @click="switchValue = false">通过代码关闭</button>
        <button class="action-btn" @click="switchValue = !switchValue">通过代码切换</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TSwitch } from "tune-ui";

const switchValue = ref(false);
const eventLogs = ref([]);

/**
 * 处理开关change事件
 */
const handleChange = value => {
  eventLogs.value.unshift(`change事件触发：值变为 ${value ? "开启" : "关闭"}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * 清除日志记录
 */
const clearLogs = () => {
  eventLogs.value = [];
};
</script>

<style scoped>
.switch-demo {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.event-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 4px;
}

.event-log {
  margin-top: 12px;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
}

.log-item {
  padding: 6px 0;
  border-bottom: 1px dashed #e0e0e0;
}

.log-item:last-child {
  border-bottom: none;
}

.event-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.action-btn,
.clear-btn {
  padding: 6px 12px;
  font-size: 14px;
  background-color: #f0f0f0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
}

.action-btn:hover,
.clear-btn:hover {
  background-color: #e6e6e6;
}
</style>
