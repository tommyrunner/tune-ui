<template>
  <div class="dialog-demo">
    <div class="button-group">
      <t-button type="primary" @click="openDialog('tiny')">Extra Small</t-button>
      <t-button type="primary" @click="openDialog('small')">Small</t-button>
      <t-button type="primary" @click="openDialog('medium')">Medium</t-button>
      <t-button type="primary" @click="openDialog('large')">Large</t-button>
      <t-button type="primary" @click="openDialog('full')">Full Screen</t-button>
    </div>

    <t-dialog v-model="sizeDialogVisible" :title="dialogTitle" :size="currentSize">
      <div class="dialog-content">
        <p>
          Current dialog size: <strong>{{ sizeText }}</strong>
        </p>
        <p>You can change the dialog size by setting the <code>size</code> property. Available values include:</p>
        <ul>
          <li><code>tiny</code>: Extra small size</li>
          <li><code>small</code>: Small size</li>
          <li><code>medium</code>: Medium size (default)</li>
          <li><code>large</code>: Large size</li>
          <li><code>full</code>: Full screen</li>
        </ul>
        <p>You can also set the dialog width directly through the <code>width</code> property.</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="sizeDialogVisible = false">Close</t-button>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const sizeDialogVisible = ref(false);
const currentSize = ref("medium");

const sizeTextMap = {
  tiny: "Extra Small",
  small: "Small",
  medium: "Medium",
  large: "Large",
  full: "Full Screen"
};

/**
 * Calculate size text
 * @returns {string} Size text
 */
const sizeText = computed(() => sizeTextMap[currentSize.value]);

/**
 * Calculate dialog title
 * @returns {string} Dialog title
 */
const dialogTitle = computed(() => `${sizeText.value} Dialog`);

/**
 * Open dialog with specified size
 * @param {string} size - Dialog size
 * @returns {void}
 */
const openDialog = size => {
  currentSize.value = size;
  sizeDialogVisible.value = true;
};
</script>

<style scoped>
.dialog-demo {
  padding: 16px 0;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
