<template>
  <div class="dialog-demo">
    <t-button type="primary" @click="outerDialogVisible = true">Open Outer Dialog</t-button>

    <!-- Outer Dialog -->
    <t-dialog v-model="outerDialogVisible" title="Outer Dialog" width="60%">
      <div class="dialog-content">
        <p>This is the content of the outer dialog. Inside the dialog, you can open another nested dialog.</p>
        <p>Nested dialogs are very useful for hierarchical forms, step-by-step operations, or scenarios that require subdivided content.</p>
        <div class="demo-actions">
          <t-button type="primary" @click="innerDialogVisible = true">Open Nested Dialog</t-button>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="outerDialogVisible = false">Close</t-button>
        </div>
      </template>
    </t-dialog>

    <!-- Inner Dialog -->
    <t-dialog v-model="innerDialogVisible" title="Nested Dialog" width="400px" append-to-body>
      <div class="dialog-content">
        <p>This is the inner dialog nested within the outer dialog.</p>
        <p>Note: Nested dialogs need to set the <code>append-to-body</code> property to <code>true</code> to avoid style and positioning issues.</p>
        <div class="demo-actions nested">
          <t-button type="primary" @click="deepDialogVisible = true">Open Third Level Dialog</t-button>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="innerDialogVisible = false">Close</t-button>
          <t-button type="primary" @click="handleInnerConfirm">Confirm</t-button>
        </div>
      </template>
    </t-dialog>

    <!-- Third Level Dialog -->
    <t-dialog v-model="deepDialogVisible" title="Third Level Dialog" width="300px" append-to-body>
      <div class="dialog-content">
        <p>This is the third level dialog, demonstrating the effect of multi-level nesting.</p>
        <p>When using multi-level nesting, attention should be paid to user experience to avoid too many nesting levels.</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button type="primary" @click="deepDialogVisible = false">Got It</t-button>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Control the display state of each level dialog
const outerDialogVisible = ref(false);
const innerDialogVisible = ref(false);
const deepDialogVisible = ref(false);

// Record operation result
const operationResult = ref("");

/**
 * Handle inner dialog confirmation
 */
const handleInnerConfirm = () => {
  operationResult.value = "Inner dialog confirmed";
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
