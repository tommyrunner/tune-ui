<template>
  <div class="date-picker-demo">
    <div class="demo-item">
      <h4>事件处理示例</h4>
      <t-date-picker-multiple
        v-model="dateValues"
        :is-range="true"
        @change="handleChange"
        @panel-change="handlePanelChange"
        @clear="handleClear"
        @focus="handleFocus"
        @blur="handleBlur"
        @date-dialog-open="handleDialogOpen"
        @date-dialog-close="handleDialogClose"
      />
      <div class="value-display">
        <div class="current-value">当前值：{{ formatDisplayDates(dateValues) }}</div>
        <div class="event-log">
          <div class="event-title">事件记录:</div>
          <div v-for="(log, index) in eventLogs" :key="index" class="event-item">{{ log }}</div>
        </div>
        <div class="actions">
          <button class="clear-btn" @click="clearEventLogs">清空事件记录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TDatePickerMultiple } from "tune-ui";
import dayjs from "dayjs";

// 状态数据
const dateValues = ref([]);
const eventLogs = ref([]);

/**
 * 格式化显示日期
 */
const formatDisplayDates = (dates, format = "YYYY-MM-DD") => {
  if (!dates || dates.length === 0) return "未选择";
  return dates
    .map(date => {
      if (typeof date === "string") return date;
      if (date instanceof Date) return dayjs(date).format(format);
      return date;
    })
    .join(", ");
};

/**
 * 清空事件记录
 */
const clearEventLogs = () => {
  eventLogs.value = [];
};

// 事件处理函数
/**
 * 处理值变化事件
 */
const handleChange = value => {
  addEventLog(`change 事件触发，值: ${formatDisplayDates(value)}`);
};

/**
 * 处理面板变化事件
 */
const handlePanelChange = mode => {
  addEventLog(`panel-change 事件触发，模式: ${mode}`);
};

/**
 * 处理清空事件
 */
const handleClear = () => {
  addEventLog("clear 事件触发");
};

/**
 * 处理聚焦事件
 */
const handleFocus = () => {
  addEventLog("focus 事件触发");
};

/**
 * 处理失焦事件
 */
const handleBlur = () => {
  addEventLog("blur 事件触发");
};

/**
 * 处理日期对话框打开事件
 */
const handleDialogOpen = () => {
  addEventLog("date-dialog-open 事件触发");
};

/**
 * 处理日期对话框关闭事件
 */
const handleDialogClose = () => {
  addEventLog("date-dialog-close 事件触发");
};

/**
 * 添加事件日志并限制最大数量
 */
const addEventLog = log => {
  eventLogs.value.unshift(log);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};
</script>

<style scoped>
.date-picker-demo {
  padding: 16px 0;
}

.demo-item {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 500;
}

.value-display {
  margin-top: 10px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
}

.current-value {
  margin-bottom: 10px;
  font-weight: 500;
}

.event-log {
  margin: 10px 0;
  max-height: 200px;
  overflow-y: auto;
}

.event-title {
  font-weight: 500;
  margin-bottom: 6px;
}

.event-item {
  padding: 4px 0;
  border-bottom: 1px dashed #e0e0e0;
  font-size: 13px;
}

.actions {
  margin-top: 10px;
}

.clear-btn {
  padding: 4px 8px;
  background-color: #f2f3f5;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.clear-btn:hover {
  background-color: #e6e8eb;
}
</style>
