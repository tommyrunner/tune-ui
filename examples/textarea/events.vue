<template>
  <div class="textarea-demo">
    <t-textarea
      v-model="textValue"
      placeholder="触发各种事件"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @enter="handleEnter"
    />
    <div class="event-log">
      <div class="event-title">事件记录：</div>
      <div v-for="(log, index) in eventLogs" :key="index" class="event-item">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const textValue = ref("");
const eventLogs = ref([]);

/**
 * 添加事件日志
 * @param {string} type - 事件类型
 * @param {string} value - 事件值
 */
const addLog = (type, value) => {
  const now = new Date();
  const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  eventLogs.value.unshift(`[${timeStr}] ${type}: ${value || "(空)"}`);

  // 限制日志条数
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * 处理获得焦点事件
 */
const handleFocus = value => {
  addLog("获得焦点", value);
};

/**
 * 处理失去焦点事件
 */
const handleBlur = value => {
  addLog("失去焦点", value);
};

/**
 * 处理输入事件
 */
const handleInput = value => {
  addLog("输入", value);
};

/**
 * 处理回车事件
 */
const handleEnter = value => {
  addLog("回车", value);
};
</script>

<style scoped>
.textarea-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-log {
  padding: 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 14px;
}

.event-title {
  font-weight: 500;
  margin-bottom: 8px;
  color: #374151;
}

.event-item {
  padding: 6px 0;
  border-bottom: 1px dashed #e5e7eb;
  color: #4b5563;
  font-family: monospace;
}

.event-item:last-child {
  border-bottom: none;
}

.t-textarea {
  width: 320px;
}
</style>
