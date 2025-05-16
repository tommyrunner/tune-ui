<template>
  <div class="drawer-demo">
    <t-button type="primary" @click="drawerVisible = true">打开事件测试抽屉</t-button>
    
    <t-drawer
      v-model="drawerVisible"
      title="事件测试抽屉"
      @open="handleOpen"
      @close="handleClose"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <div class="drawer-content">
        <p>抽屉组件提供了以下事件：</p>
        <ul>
          <li><code>open</code>：抽屉打开时触发</li>
          <li><code>close</code>：抽屉关闭时触发</li>
          <li><code>confirm</code>：点击确认按钮时触发</li>
          <li><code>cancel</code>：点击取消按钮时触发</li>
        </ul>
        <p>您可以通过事件监听抽屉的各种状态变化。</p>
        <p>尝试操作抽屉，查看下方的事件记录。</p>
      </div>
    </t-drawer>
    
    <div class="event-log" v-if="logs.length > 0">
      <h3>事件记录</h3>
      <ul class="log-list">
        <li v-for="(log, index) in logs" :key="index" :class="getLogClass(log)">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-type">{{ log.event }}</span>
        </li>
      </ul>
      <div class="log-actions">
        <t-button size="small" @click="logs = []">清空记录</t-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TDrawer, TButton } from "tune-ui";

const drawerVisible = ref(false);
const logs = ref([]);

/**
 * 添加事件日志
 */
const addLog = (event) => {
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  logs.value.unshift({ event, time });
  
  // 限制记录数量
  if (logs.value.length > 10) {
    logs.value = logs.value.slice(0, 10);
  }
};

/**
 * 获取日志条目的CSS类
 */
const getLogClass = (log) => {
  if (log.event.includes("open")) return "log-open";
  if (log.event.includes("close")) return "log-close";
  if (log.event.includes("confirm")) return "log-confirm";
  if (log.event.includes("cancel")) return "log-cancel";
  return "";
};

/**
 * 事件处理函数
 */
const handleOpen = () => {
  addLog("抽屉打开 (open)");
};

const handleClose = () => {
  addLog("抽屉关闭 (close)");
};

const handleConfirm = () => {
  addLog("点击确认按钮 (confirm)");
};

const handleCancel = () => {
  addLog("点击取消按钮 (cancel)");
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