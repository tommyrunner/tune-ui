<template>
  <div class="drawer-demo">
    <div class="button-group">
      <t-button type="primary" @click="customDrawerVisible = true">Custom Buttons</t-button>
      <t-button type="primary" @click="alignDrawerVisible = true">Button Alignment</t-button>
      <t-button type="primary" @click="hiddenDrawerVisible = true">Hide Buttons</t-button>
    </div>

    <!-- Custom buttons -->
    <t-drawer
      v-model="customDrawerVisible"
      title="Custom Buttons"
      confirm-text="Save Changes"
      cancel-text="Back to List"
      confirm-type="success"
      cancel-type="info"
    >
      <div class="drawer-content">
        <p>You can customize the footer buttons with the following properties:</p>
        <ul>
          <li><code>confirm-text</code>: Customize confirm button text</li>
          <li><code>cancel-text</code>: Customize cancel button text</li>
          <li><code>confirm-type</code>: Set confirm button type</li>
          <li><code>cancel-type</code>: Set cancel button type</li>
        </ul>
        <p>These configuration options allow you to adjust button text and styles according to business scenarios.</p>
      </div>
    </t-drawer>

    <!-- Button alignment -->
    <t-drawer v-model="alignDrawerVisible" title="Button Alignment" :btn-align="btnAlign">
      <div class="drawer-content">
        <p>Use the <code>btn-align</code> property to set the alignment of footer buttons.</p>
        <div class="align-options">
          <t-button size="small" @click="btnAlign = 'flex-start'">Left Align</t-button>
          <t-button size="small" @click="btnAlign = 'center'">Center Align</t-button>
          <t-button size="small" @click="btnAlign = 'flex-end'">Right Align</t-button>
        </div>
        <p class="current-align">Current alignment: {{ alignText[btnAlign] }}</p>
      </div>
    </t-drawer>

    <!-- Hide buttons -->
    <t-drawer v-model="hiddenDrawerVisible" title="Hide Buttons and Close Icon" :is-foot="false" :is-close-icon="false">
      <div class="drawer-content">
        <p>You can control the display of buttons and close icon by setting the following properties:</p>
        <ul>
          <li><code>is-foot</code>: Set to <code>false</code> to hide the footer button area</li>
          <li><code>is-close-icon</code>: Set to <code>false</code> to hide the close icon in the top right corner</li>
        </ul>
        <p>This configuration is suitable for scenarios that require completely custom content and operations.</p>
        <div class="custom-actions">
          <t-button type="primary" @click="hiddenDrawerVisible = false">Got it</t-button>
        </div>
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const customDrawerVisible = ref(false);
const alignDrawerVisible = ref(false);
const hiddenDrawerVisible = ref(false);
const btnAlign = ref("flex-end");

const alignText = reactive({
  "flex-start": "Left Align",
  center: "Center Align",
  "flex-end": "Right Align"
});
</script>

<style scoped>
.drawer-demo {
  padding: 16px 0;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.drawer-content {
  line-height: 1.6;
  color: #606266;
}

.drawer-content p {
  margin: 0 0 12px;
}

.drawer-content ul {
  margin: 0 0 12px;
  padding-left: 24px;
}

.drawer-content li {
  margin-bottom: 8px;
}

.drawer-content code {
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
