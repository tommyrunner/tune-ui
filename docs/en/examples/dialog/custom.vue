<template>
  <div class="dialog-demo">
    <div class="controls">
      <div class="control-item">
        <label>Width:</label>
        <t-input v-model="width" placeholder="e.g.: 600px or 50%"></t-input>
      </div>
      <div class="control-item">
        <label>Top Distance:</label>
        <t-input v-model="top" placeholder="e.g.: 20vh or 100px"></t-input>
      </div>
      <div class="control-item">
        <label>Center Title and Footer:</label>
        <t-switch v-model="center"></t-switch>
      </div>
      <t-button type="primary" @click="customStyleDialogVisible = true">Open Dialog</t-button>
    </div>

    <t-dialog v-model="customStyleDialogVisible" title="Custom Style Dialog" :width="width" :top="top" :center="center">
      <div class="dialog-content">
        <p>You can customize the dialog style with the following properties:</p>
        <ul>
          <li><strong>width</strong>: Set the dialog width, can be pixel value or percentage</li>
          <li><strong>top</strong>: Set the distance from the top of the dialog</li>
          <li><strong>center</strong>: Set whether the title and footer content are centered</li>
        </ul>
        <p>Current Settings:</p>
        <pre>{{ currentSettings }}</pre>
      </div>
      <template #footer>
        <div class="dialog-footer" :class="{ 'is-center': center }">
          <t-button @click="customStyleDialogVisible = false">Cancel</t-button>
          <t-button type="primary" @click="customStyleDialogVisible = false">Confirm</t-button>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const customStyleDialogVisible = ref(false);
const width = ref("50%");
const top = ref("10vh");
const center = ref(false);

const currentSettings = computed(() => {
  return {
    width: width.value,
    top: top.value,
    center: center.value
  };
});
</script>

<style scoped>
.dialog-demo {
  padding: 16px 0;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-item label {
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
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

.dialog-content pre {
  background-color: #f5f7fa;
  padding: 12px;
  border-radius: 4px;
  font-family: Consolas, Monaco, monospace;
  margin: 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.dialog-footer.is-center {
  justify-content: center;
}
</style>
