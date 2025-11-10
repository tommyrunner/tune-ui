<template>
  <div class="dialog-demo">
    <div class="button-group">
      <t-button type="primary" @click="customDialogVisible = true">Custom Buttons</t-button>
      <t-button type="primary" @click="alignDialogVisible = true">Button Alignment</t-button>
      <t-button type="primary" @click="noneDialogVisible = true">No Buttons</t-button>
    </div>

    <!-- Custom buttons -->
    <t-dialog
      v-model="customDialogVisible"
      title="Custom Buttons"
      confirm-text="Save Changes"
      cancel-text="Back to List"
      confirm-type="success"
      cancel-type="info"
    >
      <div class="dialog-content">
        <p>You can customize the footer buttons with the following properties:</p>
        <ul>
          <li><code>confirm-text</code>: Customize confirm button text</li>
          <li><code>cancel-text</code>: Customize cancel button text</li>
          <li><code>confirm-type</code>: Set confirm button type</li>
          <li><code>cancel-type</code>: Set cancel button type</li>
        </ul>
      </div>
    </t-dialog>

    <!-- Button alignment -->
    <t-dialog v-model="alignDialogVisible" title="Button Alignment" :btn-align="btnAlign">
      <div class="dialog-content">
        <p>Use the <code>btn-align</code> property to set the alignment of footer buttons.</p>
        <div class="align-options">
          <t-button size="small" @click="btnAlign = 'flex-start'">Left Align</t-button>
          <t-button size="small" @click="btnAlign = 'center'">Center Align</t-button>
          <t-button size="small" @click="btnAlign = 'flex-end'">Right Align</t-button>
        </div>
        <p class="current-align">Current alignment: {{ alignText[btnAlign] }}</p>
      </div>
    </t-dialog>

    <!-- No buttons -->
    <t-dialog v-model="noneDialogVisible" title="No Footer Buttons" :is-foot="false">
      <div class="dialog-content">
        <p>Set the <code>is-foot</code> property to <code>false</code> to hide the footer button area.</p>
        <p>This is suitable for pure display content or scenarios where the content already includes action buttons.</p>
        <div class="custom-actions">
          <t-button type="primary" @click="noneDialogVisible = false">Got it</t-button>
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
  "flex-start": "Left Align",
  center: "Center Align",
  "flex-end": "Right Align"
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
