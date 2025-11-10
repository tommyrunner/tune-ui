<template>
  <div class="dialog-demo">
    <t-button type="primary" @click="eventsDialogVisible = true">打开事件测试对话框</t-button>

    <t-dialog
      v-model="eventsDialogVisible"
      title="事件测试对话框"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @open="handleOpen"
      @close="handleClose"
      @opened="handleOpened"
      @closed="handleClosed"
      @drag-start="handleDragStart"
      @drag="handleDrag"
      @drag-end="handleDragEnd"
      :draggable="true"
    >
      <div class="dialog-content">
        <p>对话框提供了以下事件：</p>
        <ul>
          <li><code>confirm</code>：点击确认按钮时触发</li>
          <li><code>cancel</code>：点击取消按钮时触发</li>
          <li><code>open</code>：对话框开始打开时触发</li>
          <li><code>opened</code>：对话框打开动画结束时触发</li>
          <li><code>close</code>：对话框开始关闭时触发</li>
          <li><code>closed</code>：对话框关闭动画结束时触发</li>
          <li><code>drag-start</code>：开始拖拽时触发</li>
          <li><code>drag</code>：拖拽过程中触发</li>
          <li><code>drag-end</code>：拖拽结束时触发</li>
        </ul>
        <p>请打开控制台查看事件记录。</p>
        <p>对话框是可拖拽的，可以尝试拖拽查看相关事件。</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="handleCancelBtn">取消</t-button>
          <t-button type="primary" @click="handleConfirmBtn">确认</t-button>
        </div>
      </template>
    </t-dialog>

    <div class="event-log" v-if="eventLogs.length > 0">
      <h4>事件记录：</h4>
      <ul>
        <li v-for="(log, index) in eventLogs" :key="index" :class="getLogClass(log)">
          {{ log }}
        </li>
      </ul>
      <div class="clear-log">
        <t-button size="small" @click="eventLogs = []">清除记录</t-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const eventsDialogVisible = ref(false);
const eventLogs = ref([]);

/**
 * 添加事件日志
 * @param {string} event - 事件名称
 * @param {string} detail - 事件详情
 * @returns {void}
 */
const addLog = (event, detail = "") => {
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${now.getMilliseconds().toString().padStart(3, "0")}`;
  eventLogs.value.unshift(`${time} - ${event}${detail ? ": " + detail : ""}`);

  // 限制日志条数
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10);
  }
};

/**
 * 获取日志条目的CSS类
 * @param {string} log - 日志内容
 * @returns {string} CSS类名
 */
const getLogClass = log => {
  if (log.includes("confirm")) return "log-confirm";
  if (log.includes("cancel")) return "log-cancel";
  if (log.includes("open")) return "log-open";
  if (log.includes("close")) return "log-close";
  if (log.includes("drag")) return "log-drag";
  return "";
};

/**
 * 事件处理函数
 */
const handleConfirm = () => {
  addLog("confirm事件");
};

const handleCancel = () => {
  addLog("cancel事件");
};

const handleOpen = () => {
  addLog("open事件", "对话框开始打开");
};

const handleOpened = () => {
  addLog("opened事件", "对话框打开动画结束");
};

const handleClose = () => {
  addLog("close事件", "对话框开始关闭");
};

const handleClosed = () => {
  addLog("closed事件", "对话框关闭动画结束");
};

const handleDragStart = event => {
  addLog("drag-start事件", `x=${Math.round(event.x)}, y=${Math.round(event.y)}`);
};

const handleDrag = event => {
  if (Math.random() > 0.9) {
    // 只记录部分拖拽事件，避免过多日志
    addLog("drag事件", `x=${Math.round(event.x)}, y=${Math.round(event.y)}`);
  }
};

const handleDragEnd = event => {
  addLog("drag-end事件", `x=${Math.round(event.x)}, y=${Math.round(event.y)}`);
};

/**
 * 按钮点击处理
 */
const handleConfirmBtn = () => {
  console.log("确认按钮点击");
  eventsDialogVisible.value = false;
};

const handleCancelBtn = () => {
  console.log("取消按钮点击");
  eventsDialogVisible.value = false;
};
</script>

<style scoped>
.dialog-demo {
  padding: 16px 0;
}

.dialog-content {
  line-height: 1.6;
  color: #606266;
}

.dialog-content p {
  margin: 0 0 12px;
}

.dialog-content ul {
  margin: 0 0 12px;
  padding-left: 24px;
}

.dialog-content li {
  margin-bottom: 4px;
}

.dialog-content code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.event-log {
  margin-top: 20px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.event-log h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #606266;
}

.event-log ul {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
  font-family: Consolas, Monaco, monospace;
}

.event-log li {
  padding: 4px 8px;
  border-radius: 2px;
  margin-bottom: 2px;
}

.log-confirm {
  background-color: #f0f9eb;
  color: #67c23a;
}

.log-cancel {
  background-color: #fef0f0;
  color: #f56c6c;
}

.log-open,
.log-close {
  background-color: #ecf5ff;
  color: #409eff;
}

.log-drag {
  background-color: #f5f7fa;
  color: #909399;
}

.clear-log {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
