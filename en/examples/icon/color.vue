<template>
  <div class="icon-demo">
    <div class="color-row">
      <!-- Custom colors -->
      <div class="color-section">
        <h4>Custom Colors</h4>
        <div class="color-list">
          <div class="color-item">
            <t-icon icon="info" color="#3b82f6" :size="24" />
            <span>#3b82f6</span>
          </div>
          <div class="color-item">
            <t-icon icon="info" color="#10b981" :size="24" />
            <span>#10b981</span>
          </div>
          <div class="color-item">
            <t-icon icon="info" color="#f59e0b" :size="24" />
            <span>#f59e0b</span>
          </div>
          <div class="color-item">
            <t-icon icon="info" color="#ef4444" :size="24" />
            <span>#ef4444</span>
          </div>
        </div>
      </div>

      <!-- Theme colors -->
      <div class="color-section">
        <h4>Theme Colors</h4>
        <div class="color-list">
          <div class="color-item">
            <t-icon icon="info" type="primary" :size="24" />
            <span>primary</span>
          </div>
          <div class="color-item">
            <t-icon icon="info" type="success" :size="24" />
            <span>success</span>
          </div>
          <div class="color-item">
            <t-icon icon="info" type="warning" :size="24" />
            <span>warning</span>
          </div>
          <div class="color-item">
            <t-icon icon="info" type="danger" :size="24" />
            <span>danger</span>
          </div>
          <div class="color-item">
            <t-icon icon="info" type="info" :size="24" />
            <span>info</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-demo {
  padding: 16px 0;
}

.color-row {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.color-section h4 {
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 500;
}

.color-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.color-item span {
  font-size: 12px;
  color: #666;
}
</style>
