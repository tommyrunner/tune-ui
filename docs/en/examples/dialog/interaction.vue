<template>
  <div class="dialog-demo">
    <div class="button-group">
      <t-button type="primary" @click="noModalDialogVisible = true">No Modal Overlay</t-button>
      <t-button type="primary" @click="noEscapeDialogVisible = true">Disable Close Methods</t-button>
      <t-button type="primary" @click="customStyleDialogVisible = true">Custom Style</t-button>
    </div>

    <!-- No Modal Overlay -->
    <t-dialog v-model="noModalDialogVisible" title="No Modal Overlay Dialog" :is-modal="false">
      <div class="dialog-content">
        <p>You can hide the modal overlay by setting the <code>is-modal</code> property to <code>false</code>.</p>
        <p>
          Dialogs without modal overlay allow users to interact with other parts of the page simultaneously, suitable for
          auxiliary dialogs that don't require forced user response.
        </p>
      </div>
    </t-dialog>

    <!-- Disable Close Methods -->
    <t-dialog
      v-model="noEscapeDialogVisible"
      title="Disable Default Close Methods"
      :close-on-press-model="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-content">
        <p>You can disable default close methods by setting the following properties:</p>
        <ul>
          <li><code>close-on-press-model</code>: Set to <code>false</code> to prevent closing by clicking the overlay</li>
          <li><code>close-on-press-escape</code>: Set to <code>false</code> to prevent closing by pressing ESC key</li>
        </ul>
        <p>This setting is suitable for important dialogs that require explicit user action, avoiding accidental closure.</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button type="primary" @click="noEscapeDialogVisible = false">I Understand</t-button>
        </div>
      </template>
    </t-dialog>

    <!-- Custom Style -->
    <t-dialog
      v-model="customStyleDialogVisible"
      title="Custom Style Dialog"
      :width="dialogWidth"
      :top="dialogTop"
      :padding="dialogPadding"
      :box-shadow="dialogShadow"
    >
      <div class="dialog-content">
        <p>The dialog provides various style customization options:</p>
        <div class="style-controls">
          <div class="control-item">
            <label>Width:</label>
            <div class="buttons">
              <t-button size="small" @click="dialogWidth = '400px'">Narrow</t-button>
              <t-button size="small" @click="dialogWidth = '600px'">Medium</t-button>
              <t-button size="small" @click="dialogWidth = '800px'">Wide</t-button>
            </div>
          </div>
          <div class="control-item">
            <label>Top Distance:</label>
            <div class="buttons">
              <t-button size="small" @click="dialogTop = '5vh'">Top</t-button>
              <t-button size="small" @click="dialogTop = '15vh'">Center</t-button>
              <t-button size="small" @click="dialogTop = '30vh'">Bottom</t-button>
            </div>
          </div>
          <div class="control-item">
            <label>Padding:</label>
            <div class="buttons">
              <t-button size="small" @click="dialogPadding = [8, 8, 8, 8]">Small</t-button>
              <t-button size="small" @click="dialogPadding = [16, 16, 16, 16]">Medium</t-button>
              <t-button size="small" @click="dialogPadding = [24, 24, 24, 24]">Large</t-button>
            </div>
          </div>
        </div>
        <div class="current-styles">
          <p>Current Styles:</p>
          <ul>
            <li>Width: {{ dialogWidth }}</li>
            <li>Top Distance: {{ dialogTop }}</li>
            <li>Padding: [{{ dialogPadding.join(", ") }}]</li>
          </ul>
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const noModalDialogVisible = ref(false);
const noEscapeDialogVisible = ref(false);
const customStyleDialogVisible = ref(false);

// Custom style properties
const dialogWidth = ref("600px");
const dialogTop = ref("15vh");
const dialogPadding = ref([16, 16, 16, 16]);
const dialogShadow = ref([0, 3, 10, "rgba(0, 0, 0, 0.1)"]);
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

.style-controls {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
}

.control-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.control-item label {
  width: 80px;
  color: #606266;
}

.buttons {
  display: flex;
  gap: 8px;
}

.current-styles {
  background-color: #ecf5ff;
  border-radius: 4px;
  padding: 12px;
}

.current-styles p {
  font-weight: bold;
  margin-bottom: 8px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
