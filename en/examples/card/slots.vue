<template>
  <div class="card-demo">
    <t-card>
      <template #headLeft>
        <div class="custom-header">
          <t-icon icon="home" />
          <span>Custom Header Left</span>
        </div>
      </template>

      <template #headRight>
        <t-button size="small">Settings</t-button>
      </template>

      <div class="card-content">
        <p>This is the main content area of the card</p>
        <p>Use default slot to display content</p>
      </div>

      <template #footer>
        <div class="custom-footer">
          <span>Custom Footer Content</span>
          <div class="footer-buttons">
            <t-button size="small">Cancel</t-button>
            <t-button type="primary" size="small">Confirm</t-button>
          </div>
        </div>
      </template>
    </t-card>
  </div>
</template>

<style scoped>
.card-demo {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 6px;
}

.custom-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-content p {
  margin: 0;
  line-height: 1.6;
  color: #606266;
}

.custom-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.footer-buttons {
  display: flex;
  gap: 8px;
}
</style>
