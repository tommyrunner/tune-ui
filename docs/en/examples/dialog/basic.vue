<template>
  <div class="dialog-demo">
    <t-button type="primary" @click="basicDialogVisible = true">Open Dialog</t-button>

    <t-dialog v-model="basicDialogVisible" title="Basic Dialog">
      <div class="dialog-content">
        This is the content area of a basic dialog. The dialog component provides an elegant way to interact with users without leaving the current page.
        It is commonly used for displaying important information, requesting user confirmation, or collecting user input.
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="basicDialogVisible = false">Cancel</t-button>
          <t-button type="primary" @click="handleConfirm">Confirm</t-button>
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
 * Handle confirm button click
 * @returns {void}
 */
const handleConfirm = () => {
  tipMessage.value = "You clicked the confirm button!";
  basicDialogVisible.value = false;

  // Clear tip message after 3 seconds
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
