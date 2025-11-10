<template>
  <div class="dialog-demo">
    <div class="button-group">
      <t-button type="primary" @click="openDialog('icon')">带图标标题</t-button>
      <t-button type="primary" @click="openDialog('noclose')">无关闭图标</t-button>
      <t-button type="primary" @click="openDialog('custom')">自定义标题</t-button>
    </div>

    <!-- 带图标标题 -->
    <t-dialog v-model="iconDialogVisible" title="带图标标题" icon="info">
      <div class="dialog-content">
        <p>通过设置 <code>icon</code> 属性可以在标题前添加图标。</p>
        <p>适合用于强调对话框的类型或用途，如信息提示、警告提示、错误提示等。</p>
      </div>
    </t-dialog>

    <!-- 无关闭图标 -->
    <t-dialog v-model="noCloseDialogVisible" title="无关闭图标" :is-close-icon="false">
      <div class="dialog-content">
        <p>通过设置 <code>is-close-icon</code> 属性为 <code>false</code> 可以隐藏右上角的关闭图标。</p>
        <p>适用于只允许通过特定按钮关闭的对话框，增强用户操作的确定性。</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button type="primary" @click="noCloseDialogVisible = false">关闭</t-button>
        </div>
      </template>
    </t-dialog>

    <!-- 自定义标题 -->
    <t-dialog v-model="titleCustomDialogVisible">
      <template #title>
        <div class="custom-title">
          <t-icon icon="warning" class="warning-icon" />
          <span>自定义标题内容</span>
          <span class="status-badge">重要</span>
        </div>
      </template>
      <div class="dialog-content">
        <p>通过 <code>title</code> 插槽可以完全自定义标题区域的内容。</p>
        <p>可以添加图标、标签、徽章或其他任何元素，实现更丰富的视觉效果。</p>
      </div>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const iconDialogVisible = ref(false);
const noCloseDialogVisible = ref(false);
const titleCustomDialogVisible = ref(false);

/**
 * 打开不同类型的对话框
 * @param {string} type - 对话框类型
 * @returns {void}
 */
const openDialog = type => {
  if (type === "icon") {
    iconDialogVisible.value = true;
  } else if (type === "noclose") {
    noCloseDialogVisible.value = true;
  } else if (type === "custom") {
    titleCustomDialogVisible.value = true;
  }
};
</script>

<style scoped>
.dialog-demo {
  padding: 16px 0;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.dialog-content {
  line-height: 1.6;
  color: #606266;
}

.dialog-content p {
  margin: 0 0 12px;
}

.dialog-content code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.warning-icon {
  color: #e6a23c;
}

.status-badge {
  padding: 2px 6px;
  background-color: #f56c6c;
  border-radius: 10px;
  font-size: 12px;
  color: white;
  margin-left: auto;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
