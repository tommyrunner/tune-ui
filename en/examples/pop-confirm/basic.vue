<template>
  <div class="demo-container">
    <p class="demo-desc">Pop confirm is commonly used in scenarios that require user secondary confirmation, such as deletion, modification, etc.</p>
    
    <div class="demo-block">
      <div class="block-item">
        <t-pop-confirm content="Are you sure you want to delete this record?">
          <t-button type="danger">Delete</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="block-item">
        <t-pop-confirm content="Are you sure you want to disable this feature?" disabled>
          <t-button type="info">Disabled State</t-button>
        </t-pop-confirm>
        <span class="tip-text">Pop confirm will not be triggered when disabled</span>
      </div>
    </div>
  </div>
</template>

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
}

.block-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.tip-text {
  font-size: 12px;
  color: #909399;
}
</style> 