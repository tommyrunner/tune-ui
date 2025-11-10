<template>
  <div class="demo-container">
    <p class="demo-desc">The popover can be configured with a modal overlay to achieve dialog-like effects.</p>
    <div class="demo-block">
      <div class="modal-section">
        <t-popover
          title="Modal Popover"
          content="This is a popover with an overlay, click the overlay to close."
          type="click"
          :modal="true"
          position="top"
          @click-modal="handleClickModal"
        >
          <t-button type="primary">Popover with Overlay</t-button>
        </t-popover>

        <t-popover
          title="Modal Popover (No Close on Overlay Click)"
          content="This is a popover with an overlay, but clicking the overlay won't close it."
          type="click"
          :modal="true"
          :close-on-modal-click="false"
          position="top"
        >
          <t-button type="warning">Overlay No Close</t-button>
        </t-popover>
      </div>

      <div class="modal-custom">
        <t-popover type="click" :modal="true" transition="fade" position="bottom" class="custom-modal-popover">
          <template #content>
            <div class="custom-modal-content">
              <h3 class="custom-title">Custom Modal Content</h3>
              <p class="custom-desc">This is an example of a modal popover with custom content.</p>
              <div class="custom-footer">
                <t-button size="small" @click="closeCustomModal">Cancel</t-button>
                <t-button size="small" type="primary" @click="confirmCustomModal">Confirm</t-button>
              </div>
            </div>
          </template>
          <t-button type="info">Custom Modal Content</t-button>
        </t-popover>
      </div>
    </div>

    <div class="modal-info">
      <h4>Modal Overlay Properties</h4>
      <ul>
        <li><code>modal</code>: Set to <code>true</code> to enable modal overlay background</li>
        <li><code>close-on-modal-click</code>: Set to <code>false</code> to prevent closing when clicking overlay</li>
        <li><code>modal-opacity</code>: Set overlay transparency, default is <code>0.5</code></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Handle click modal background event
const handleClickModal = () => {
  TMessage.info("Clicked on overlay");
};

// Close custom modal
const closeCustomModal = () => {
  TMessage.info("Cancel operation");
  // Close popup through parent's close method
  document.querySelector(".custom-modal-popover").__vueParentComponent.ctx.close();
};

// Confirm custom modal
const confirmCustomModal = () => {
  TMessage.success("Confirm operation");
  // Close popup through parent's close method
  document.querySelector(".custom-modal-popover").__vueParentComponent.ctx.close();
};
</script>

<style scoped>
.demo-container {
  padding: 16px 0;
}

.demo-desc {
  margin: 0 0 16px;
  color: #606266;
  line-height: 1.6;
}

.demo-block {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
}

.modal-section {
  display: flex;
  gap: 16px;
}

.modal-custom {
  margin-top: 8px;
}

.custom-modal-content {
  min-width: 280px;
  padding: 8px 0;
}

.custom-title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.custom-desc {
  margin: 0 0 20px;
  color: #606266;
  line-height: 1.5;
}

.custom-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal-info {
  width: 100%;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #409eff;
  margin-top: 16px;
}

.modal-info h4 {
  margin: 0 0 12px;
  font-size: 16px;
  color: #303133;
}

.modal-info ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
  line-height: 1.8;
}

.modal-info li {
  margin-bottom: 8px;
}

.modal-info code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: monospace;
}
</style>
