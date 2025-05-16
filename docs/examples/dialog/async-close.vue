<template>
  <div class="dialog-demo">
    <t-button type="primary" @click="dialogVisible = true">打开对话框</t-button>
    
    <t-dialog
      v-model="dialogVisible"
      title="异步关闭对话框"
      :before-close="handleBeforeClose"
    >
      <div class="dialog-content">
        <p>在某些场景中，可能需要在对话框关闭前执行特定操作，例如：</p>
        <ul>
          <li>保存未完成的表单数据</li>
          <li>向服务器提交确认操作</li>
          <li>请求用户二次确认</li>
        </ul>
        <p>通过设置 <code>before-close</code> 回调函数，可以实现这些需求。</p>
        <p>尝试点击关闭按钮或"取消"按钮，会有 2 秒的延迟，模拟异步操作。</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="handleCancel">取消</t-button>
          <t-button type="primary" @click="handleConfirm">确认</t-button>
        </div>
      </template>
    </t-dialog>
    
    <div class="status-container" v-if="status">
      <p>{{ status }}</p>
      <div class="loading-bar" v-if="isLoading"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TDialog, TButton } from "tune-ui";

const dialogVisible = ref(false);
const status = ref("");
const isLoading = ref(false);

/**
 * 处理确认按钮点击
 */
const handleConfirm = () => {
  status.value = "正在处理确认操作...";
  isLoading.value = true;
  
  // 模拟异步操作
  setTimeout(() => {
    dialogVisible.value = false;
    status.value = "操作已确认！";
    isLoading.value = false;
    
    // 3秒后清除状态
    setTimeout(() => {
      status.value = "";
    }, 3000);
  }, 2000);
};

/**
 * 处理取消按钮点击
 */
const handleCancel = () => {
  // 触发before-close回调
  dialogVisible.value = false;
};

/**
 * 关闭前的回调函数
 * @param {Function} done - 调用此函数关闭对话框
 */
const handleBeforeClose = (done) => {
  status.value = "正在执行关闭前操作...";
  isLoading.value = true;
  
  // 模拟异步操作
  setTimeout(() => {
    status.value = "操作已完成，对话框正在关闭";
    isLoading.value = false;
    done(); // 调用done函数关闭对话框
    
    // 3秒后清除状态
    setTimeout(() => {
      status.value = "";
    }, 3000);
  }, 2000);
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

.status-container {
  margin-top: 16px;
  padding: 12px;
  background-color: #e6f7ff;
  border-radius: 4px;
  color: #1890ff;
  font-size: 14px;
}

.loading-bar {
  height: 2px;
  background: linear-gradient(to right, #1890ff, #52c41a);
  margin-top: 8px;
  position: relative;
  overflow: hidden;
}

.loading-bar::before {
  content: "";
  position: absolute;
  background: inherit;
  top: 0;
  left: 0;
  bottom: 0;
  will-change: transform;
  animation: loading 2s infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
    width: 50%;
  }
  100% {
    transform: translateX(200%);
    width: 50%;
  }
}
</style> 