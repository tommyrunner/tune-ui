<template>
  <div class="example-container">
    <div class="row">
      <div class="item">
        <p>事件监听：</p>
        <t-date-picker
          v-model="date"
          value-format="YYYY-MM-DD"
          show-time
          @change="handleChange"
          @panel-change="handlePanelChange"
          @clear="handleClear"
          @focus="handleFocus"
          @blur="handleBlur"
          @time-dialog-open="handleTimeDialogOpen"
          @time-dialog-close="handleTimeDialogClose"
          @date-dialog-open="handleDateDialogOpen"
          @date-dialog-close="handleDateDialogClose"
        />
      </div>

      <div class="item">
        <div class="event-log">
          <div class="event-title">事件记录 (最近5条):</div>
          <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
            {{ event }}
          </div>
          <div class="event-buttons">
            <button @click="clearLogs">清空记录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import type { ModeType } from "@/packages/calendar/calendar";

// 事件示例数据
const date = ref("2023-06-15");
const eventLogs = ref<string[]>([]);

// 添加事件记录
const addLog = (message: string) => {
  eventLogs.value.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

// 清空记录
const clearLogs = () => {
  eventLogs.value = [];
};

// 事件处理函数
const handleChange = (value: any) => {
  addLog(`change: 值变更为 ${value}`);
};

const handlePanelChange = (mode: ModeType) => {
  addLog(`panel-change: 面板切换为 ${mode} 模式`);
};

const handleClear = () => {
  addLog("clear: 值已清空");
};

const handleFocus = () => {
  addLog("focus: 获得焦点");
};

const handleBlur = () => {
  addLog("blur: 失去焦点");
};

const handleTimeDialogOpen = () => {
  addLog("time-dialog-open: 时间对话框已打开");
};

const handleTimeDialogClose = () => {
  addLog("time-dialog-close: 时间对话框已关闭");
};

const handleDateDialogOpen = () => {
  addLog("date-dialog-open: 日期对话框已打开");
};

const handleDateDialogClose = () => {
  addLog("date-dialog-close: 日期对话框已关闭");
};
</script>

<style lang="scss" scoped>
.example-container {
  width: 100%;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 20px;

  .item {
    flex: 1;
    min-width: 250px;

    p {
      margin-bottom: 8px;
      font-weight: 500;
    }
  }
}

.event-log {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  .event-title {
    font-weight: 500;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e4e7ed;
  }

  .event-item {
    padding: 6px 0;
    border-bottom: 1px dashed #e4e7ed;
    font-size: 14px;
    word-break: break-all;
  }

  .event-buttons {
    margin-top: auto;
    padding-top: 12px;

    button {
      padding: 6px 12px;
      background-color: #f0f0f0;
      border: 1px solid #dcdfe6;
      border-radius: 3px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: #e6e6e6;
      }
    }
  }
}
</style>
