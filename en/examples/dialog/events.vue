<template>
  <div class="dialog-demo">
    <t-button type="primary" @click="eventsDialogVisible = true">Open Event Test Dialog</t-button>

    <t-dialog
      v-model="eventsDialogVisible"
      title="Event Test Dialog"
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
        <p>The dialog provides the following events:</p>
        <ul>
          <li><code>confirm</code>: Triggered when the confirm button is clicked</li>
          <li><code>cancel</code>: Triggered when the cancel button is clicked</li>
          <li><code>open</code>: Triggered when the dialog starts to open</li>
          <li><code>opened</code>: Triggered when the dialog open animation ends</li>
          <li><code>close</code>: Triggered when the dialog starts to close</li>
          <li><code>closed</code>: Triggered when the dialog close animation ends</li>
          <li><code>drag-start</code>: Triggered when dragging starts</li>
          <li><code>drag</code>: Triggered during dragging</li>
          <li><code>drag-end</code>: Triggered when dragging ends</li>
        </ul>
        <p>Please open the console to view event logs.</p>
        <p>The dialog is draggable, you can try dragging to see related events.</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="handleCancelBtn">Cancel</t-button>
          <t-button type="primary" @click="handleConfirmBtn">Confirm</t-button>
        </div>
      </template>
    </t-dialog>

    <div class="event-log" v-if="eventLogs.length > 0">
      <h4>Event Log:</h4>
      <ul>
        <li v-for="(log, index) in eventLogs" :key="index" :class="getLogClass(log)">
          {{ log }}
        </li>
      </ul>
      <div class="clear-log">
        <t-button size="small" @click="eventLogs = []">Clear Log</t-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const eventsDialogVisible = ref(false);
const eventLogs = ref([]);

/**
 * Add event log
 * @param {string} event - Event name
 * @param {string} detail - Event detail
 * @returns {void}
 */
const addLog = (event, detail = "") => {
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${now.getMilliseconds().toString().padStart(3, "0")}`;
  eventLogs.value.unshift(`${time} - ${event}${detail ? ": " + detail : ""}`);

  // Limit log count
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10);
  }
};

/**
 * Get CSS class for log entry
 * @param {string} log - Log content
 * @returns {string} CSS class name
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
 * Event handlers
 */
const handleConfirm = () => {
  addLog("confirm event");
};

const handleCancel = () => {
  addLog("cancel event");
};

const handleOpen = () => {
  addLog("open event", "dialog starts to open");
};

const handleOpened = () => {
  addLog("opened event", "dialog open animation ends");
};

const handleClose = () => {
  addLog("close event", "dialog starts to close");
};

const handleClosed = () => {
  addLog("closed event", "dialog close animation ends");
};

const handleDragStart = event => {
  addLog("drag-start event", `x=${Math.round(event.x)}, y=${Math.round(event.y)}`);
};

const handleDrag = event => {
  if (Math.random() > 0.9) {
    // Only log some drag events to avoid too many logs
    addLog("drag event", `x=${Math.round(event.x)}, y=${Math.round(event.y)}`);
  }
};

const handleDragEnd = event => {
  addLog("drag-end event", `x=${Math.round(event.x)}, y=${Math.round(event.y)}`);
};

/**
 * Button click handlers
 */
const handleConfirmBtn = () => {
  console.log("Confirm button clicked");
  eventsDialogVisible.value = false;
};

const handleCancelBtn = () => {
  console.log("Cancel button clicked");
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
