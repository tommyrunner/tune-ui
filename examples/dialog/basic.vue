<template>
  <div class="dialog-demo">
    <t-button type="primary" @click="basicDialogVisible = true">打开对话框</t-button>

    <t-dialog v-model="basicDialogVisible" title="基础对话框">
      <div class="dialog-content">
        这是一个基础对话框的内容区域。对话框组件提供了一种优雅的方式，在不离开当前页面的情况下与用户交互。
        常用于展示重要信息、请求用户确认或收集用户输入等场景。
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="basicDialogVisible = false">取消</t-button>
          <t-button type="primary" @click="handleConfirm">确认</t-button>
        </div>
      </template>
    </t-dialog>

    <div class="tip-container" v-if="tipMessage">
      <p>{{ tipMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const basicDialogVisible = ref(false);
const tipMessage = ref("");

/**
 * 处理确认按钮点击
 * @returns {void}
 */
const handleConfirm = () => {
  tipMessage.value = "您点击了确认按钮！";
  basicDialogVisible.value = false;

  // 3秒后清除提示信息
  setTimeout(() => {
    tipMessage.value = "";
  }, 3000);
};
</script>

<style scoped>
.dialog-demo {
  padding: 16px 0;
}

.dialog-content {
  line-height: 1.6;
  color: #606266;
  margin-bottom: 8px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.tip-container {
  margin-top: 16px;
  padding: 12px;
  background-color: #f0f9eb;
  border-radius: 4px;
  color: #67c23a;
  font-size: 14px;
}
</style>
