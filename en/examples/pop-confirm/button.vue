<template>
  <div class="demo-container">
    <p class="demo-desc">
      You can customize the text and type of confirm and cancel buttons by setting the <code>confirm-text</code>, <code>cancel-text</code>, <code>confirm-type</code> and <code>cancel-type</code> properties.
    </p>
    
    <div class="demo-block">
      <div class="block-section">
        <h4>Default Button Style</h4>
        <t-pop-confirm content="Are you sure you want to perform this operation?">
          <t-button type="primary">Default Button</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="block-section">
        <h4>Custom Button Text</h4>
        <t-pop-confirm 
          content="Are you sure you want to perform this operation?"
          confirm-text="Execute"
          cancel-text="Return"
        >
          <t-button type="primary">Custom Text</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="block-section">
        <h4>Custom Button Type</h4>
        <t-pop-confirm 
          content="Are you sure you want to perform this operation?"
          confirm-type="success"
          cancel-type="info"
        >
          <t-button type="primary">Custom Type</t-button>
        </t-pop-confirm>
      </div>
      
      <div class="block-section">
        <h4>Fully Customized</h4>
        <t-pop-confirm 
          content="This operation will permanently delete the file, do you want to continue?"
          confirm-text="Confirm Delete"
          cancel-text="Cancel Operation"
          confirm-type="danger"
          cancel-type="warning"
        >
          <t-button type="danger">Delete File</t-button>
        </t-pop-confirm>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 16px 0;
}

.demo-desc {
  margin: 0 0 20px;
  color: #606266;
  line-height: 1.6;
}

.demo-desc code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

.demo-block {
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
}

.block-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.block-section h4 {
  margin: 0;
  font-size: 14px;
  color: #303133;
}
</style> 