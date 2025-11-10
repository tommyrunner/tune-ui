<template>
  <div class="dialog-demo">
    <div class="button-group">
      <t-button type="primary" @click="customDialogVisible = true">自定义按钮</t-button>
      <t-button type="primary" @click="alignDialogVisible = true">按钮对齐方式</t-button>
      <t-button type="primary" @click="noneDialogVisible = true">无按钮</t-button>
    </div>

    <!-- 自定义按钮 -->
    <t-dialog
      v-model="customDialogVisible"
      title="自定义按钮"
      confirm-text="确认保存"
      cancel-text="返回列表"
      confirm-type="success"
      cancel-type="info"
    >
      <div class="dialog-content">
        <p>可以通过以下属性自定义底部按钮：</p>
        <ul>
          <li><code>confirm-text</code>：自定义确认按钮文本</li>
          <li><code>cancel-text</code>：自定义取消按钮文本</li>
          <li><code>confirm-type</code>：设置确认按钮类型</li>
          <li><code>cancel-type</code>：设置取消按钮类型</li>
        </ul>
      </div>
    </t-dialog>

    <!-- 按钮对齐方式 -->
    <t-dialog v-model="alignDialogVisible" title="按钮对齐方式" :btn-align="btnAlign">
      <div class="dialog-content">
        <p>通过 <code>btn-align</code> 属性可以设置底部按钮的对齐方式。</p>
        <div class="align-options">
          <t-button size="small" @click="btnAlign = 'flex-start'">左对齐</t-button>
          <t-button size="small" @click="btnAlign = 'center'">居中对齐</t-button>
          <t-button size="small" @click="btnAlign = 'flex-end'">右对齐</t-button>
        </div>
        <p class="current-align">当前对齐方式：{{ alignText[btnAlign] }}</p>
      </div>
    </t-dialog>

    <!-- 无按钮 -->
    <t-dialog v-model="noneDialogVisible" title="无底部按钮" :is-foot="false">
      <div class="dialog-content">
        <p>通过设置 <code>is-foot</code> 属性为 <code>false</code> 可以隐藏底部按钮区域。</p>
        <p>适用于纯展示内容或内容本身已包含操作按钮的场景。</p>
        <div class="custom-actions">
          <t-button type="primary" @click="noneDialogVisible = false">我知道了</t-button>
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const customDialogVisible = ref(false);
const alignDialogVisible = ref(false);
const noneDialogVisible = ref(false);
const btnAlign = ref("flex-end");

const alignText = reactive({
  "flex-start": "左对齐",
  center: "居中对齐",
  "flex-end": "右对齐"
});
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

.align-options {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}

.current-align {
  margin-top: 16px;
  font-weight: bold;
  color: #409eff;
}

.custom-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
