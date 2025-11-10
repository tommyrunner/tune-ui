<template>
  <div class="drawer-demo">
    <t-button type="primary" @click="eventsDrawerVisible = true">Open Event Test Drawer</t-button>

    <t-drawer
      v-model="eventsDrawerVisible"
      title="Event Test Drawer"
      @open="handleOpen"
      @close="handleClose"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <div class="drawer-content">
        <p>The drawer component provides the following events:</p>
        <ul>
          <li><code>open</code>: Triggered when the drawer opens</li>
          <li><code>close</code>: Triggered when the drawer closes</li>
          <li><code>confirm</code>: Triggered when the confirm button is clicked</li>
          <li><code>cancel</code>: Triggered when the cancel button is clicked</li>
        </ul>
        <p>You can listen to various state changes of the drawer through events.</p>
        <p>Try operating the drawer and check the event log below.</p>
      </div>
    </t-drawer>

    <div class="event-log" v-if="logs.length > 0">
      <h3>Event Log</h3>
      <ul class="log-list">
        <li v-for="(log, index) in logs" :key="index" :class="getLogClass(log)">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-type">{{ log.event }}</span>
        </li>
      </ul>
      <div class="log-actions">
        <t-button size="small" @click="logs = []">Clear Log</t-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const eventsDrawerVisible = ref(false);
const logs = ref([]);

/**
 * Add event log
 * @param {string} event - Event name
 * @returns {void}
 */
const addLog = event => {
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  logs.value.unshift({ event, time });

  // Limit log count
  if (logs.value.length > 10) {
    logs.value = logs.value.slice(0, 10);
  }
};

/**
 * Get CSS class for log entry
 * @param {Object} log - Log object
 * @returns {string} CSS class name
 */
const getLogClass = log => {
  if (log.event.includes("open")) return "log-open";
  if (log.event.includes("close")) return "log-close";
  if (log.event.includes("confirm")) return "log-confirm";
  if (log.event.includes("cancel")) return "log-cancel";
  return "";
};

/**
 * Event handlers
 */
const handleOpen = () => {
  addLog("Drawer opened (open)");
};

const handleClose = () => {
  addLog("Drawer closed (close)");
};

const handleConfirm = () => {
  addLog("Confirm button clicked (confirm)");
};

const handleCancel = () => {
  addLog("Cancel button clicked (cancel)");
};
</script>

<style scoped>
.drawer-demo {
  padding: 16px 0;
}

.drawer-content {
  line-height: 1.6;
  color: #606266;
}

.drawer-content p {
  margin: 0 0 12px;
}

.drawer-content ul {
  margin: 0 0 12px;
  padding-left: 24px;
}

.drawer-content li {
  margin-bottom: 8px;
}

.drawer-content code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

.event-log {
  margin-top: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 16px;
}

.event-log h3 {
  margin: 0 0 12px;
  font-size: 16px;
  color: #606266;
}

.log-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.log-list li {
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.log-time {
  font-family: monospace;
  color: #909399;
  margin-right: 12px;
}

.log-type {
  font-weight: 500;
}

.log-open {
  background-color: #ecf5ff;
  color: #409eff;
}

.log-close {
  background-color: #fef0f0;
  color: #f56c6c;
}

.log-confirm {
  background-color: #f0f9eb;
  color: #67c23a;
}

.log-cancel {
  background-color: #fdf6ec;
  color: #e6a23c;
}

.log-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
