<template>
  <div class="dialog-demo">
    <div class="button-group">
      <t-button type="primary" @click="openDialog('icon')">Title with Icon</t-button>
      <t-button type="primary" @click="openDialog('noclose')">No Close Icon</t-button>
      <t-button type="primary" @click="openDialog('custom')">Custom Title</t-button>
    </div>

    <!-- Title with Icon -->
    <t-dialog v-model="iconDialogVisible" title="Title with Icon" icon="info">
      <div class="dialog-content">
        <p>You can add an icon before the title by setting the <code>icon</code> property.</p>
        <p>Suitable for emphasizing the type or purpose of the dialog, such as information prompts, warning prompts, error prompts, etc.</p>
      </div>
    </t-dialog>

    <!-- No Close Icon -->
    <t-dialog v-model="noCloseDialogVisible" title="No Close Icon" :is-close-icon="false">
      <div class="dialog-content">
        <p>You can hide the close icon in the upper right corner by setting the <code>is-close-icon</code> property to <code>false</code>.</p>
        <p>Suitable for dialogs that only allow closing through specific buttons, enhancing the certainty of user operations.</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button type="primary" @click="noCloseDialogVisible = false">Close</t-button>
        </div>
      </template>
    </t-dialog>

    <!-- Custom Title -->
    <t-dialog v-model="titleCustomDialogVisible">
      <template #title>
        <div class="custom-title">
          <t-icon icon="warning" class="warning-icon" />
          <span>Custom Title Content</span>
          <span class="status-badge">Important</span>
        </div>
      </template>
      <div class="dialog-content">
        <p>You can completely customize the content of the title area through the <code>title</code> slot.</p>
        <p>You can add icons, labels, badges or any other elements to achieve richer visual effects.</p>
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
 * Open different types of dialogs
 * @param {string} type - Dialog type
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
