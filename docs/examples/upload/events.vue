<template>
  <div class="upload-demo">
    <t-upload
      action="http://rap2api.taobao.org/app/mock/322878/upload"
      @success="handleSuccess"
      @error="handleError"
      @progress="handleProgress"
      @change="handleChange"
      @remove="handleRemove"
    >
      <t-button type="primary">上传文件</t-button>
    </t-upload>

    <div class="event-log">
      <h4>事件日志</h4>
      <div class="log-container">
        <div v-for="(log, index) in logs" :key="index" class="log-item">
          <span class="log-time">{{ log.time }}</span>
          <span :class="['log-type', `log-type-${log.type}`]">{{ log.type }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
        <div v-if="!logs.length" class="no-logs">暂无日志记录</div>
      </div>
      <div class="log-actions">
        <t-button size="small" @click="clearLogs">清空日志</t-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TUpload, TButton } from "tune-ui";

// 事件日志
const logs = ref([]);

// 添加日志
const addLog = (type, message) => {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  logs.value.unshift({ type, message, time });

  // 最多保留10条日志
  if (logs.value.length > 10) {
    logs.value.pop();
  }
};

// 清空日志
const clearLogs = () => {
  logs.value = [];
};

// 事件处理函数
const handleSuccess = (file, response) => {
  addLog("success", `文件 ${file.name} 上传成功`);
};

const handleError = (file, error) => {
  addLog("error", `文件 ${file.name} 上传失败: ${error.message}`);
};

const handleProgress = (file, percent) => {
  addLog("progress", `文件 ${file.name} 上传进度: ${percent}%`);
};

const handleChange = (file, fileList) => {
  if (file) {
    addLog("change", `文件状态变更: ${file.name} (${file.status})`);
  }
};

const handleRemove = file => {
  addLog("remove", `文件 ${file.name} 已移除`);
};
</script>

<style scoped>
.upload-demo {
  width: 100%;
}

.event-log {
  margin-top: 24px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 12px;
}

h4 {
  margin: 0 0 12px;
  font-weight: 500;
}

.log-container {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 8px;
  min-height: 150px;
  max-height: 250px;
  overflow-y: auto;
}

.log-item {
  padding: 6px 0;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  display: flex;
  align-items: flex-start;
}

.log-time {
  color: #909399;
  width: 80px;
  flex-shrink: 0;
}

.log-type {
  width: 70px;
  flex-shrink: 0;
  font-weight: 500;
}

.log-type-success {
  color: #67c23a;
}

.log-type-error {
  color: #f56c6c;
}

.log-type-progress {
  color: #409eff;
}

.log-type-change {
  color: #e6a23c;
}

.log-type-remove {
  color: #909399;
}

.log-message {
  flex: 1;
  word-break: break-all;
}

.no-logs {
  color: #909399;
  text-align: center;
  padding: 30px 0;
}

.log-actions {
  margin-top: 12px;
  text-align: right;
}
</style>
