<template>
  <div class="dialog-demo">
    <t-button type="primary" @click="outerDialogVisible = true">打开外层对话框</t-button>
    
    <!-- 外层对话框 -->
    <t-dialog v-model="outerDialogVisible" title="外层对话框" width="60%">
      <div class="dialog-content">
        <p>这是外层对话框的内容。在对话框内部，您可以打开另一个嵌套的对话框。</p>
        <p>嵌套对话框对于层级表单、分步操作或需要细分内容的场景非常有用。</p>
        <div class="demo-actions">
          <t-button type="primary" @click="innerDialogVisible = true">打开嵌套对话框</t-button>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="outerDialogVisible = false">关闭</t-button>
        </div>
      </template>
    </t-dialog>
    
    <!-- 内层对话框 -->
    <t-dialog v-model="innerDialogVisible" title="嵌套对话框" width="400px" append-to-body>
      <div class="dialog-content">
        <p>这是嵌套在外层对话框内的内层对话框。</p>
        <p>注意：嵌套对话框需要设置 <code>append-to-body</code> 属性为 <code>true</code>，以避免样式和定位问题。</p>
        <div class="demo-actions nested">
          <t-button type="primary" @click="deepDialogVisible = true">打开三层对话框</t-button>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="innerDialogVisible = false">关闭</t-button>
          <t-button type="primary" @click="handleInnerConfirm">确认</t-button>
        </div>
      </template>
    </t-dialog>
    
    <!-- 三层对话框 -->
    <t-dialog v-model="deepDialogVisible" title="三层对话框" width="300px" append-to-body>
      <div class="dialog-content">
        <p>这是第三层对话框，展示了多层嵌套的效果。</p>
        <p>多层嵌套时应当注意交互体验，避免过多的嵌套层级。</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button type="primary" @click="deepDialogVisible = false">我知道了</t-button>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TDialog, TButton } from "tune-ui";

// 控制各层对话框的显示状态
const outerDialogVisible = ref(false);
const innerDialogVisible = ref(false);
const deepDialogVisible = ref(false);

// 记录操作结果
const operationResult = ref("");

/**
 * 处理内层对话框确认
 */
const handleInnerConfirm = () => {
  operationResult.value = "内层对话框已确认";
  innerDialogVisible.value = false;
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

.dialog-content code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

.demo-actions {
  margin-top: 20px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.demo-actions.nested {
  background-color: #ecf5ff;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style> 