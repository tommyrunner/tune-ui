<template>
  <div class="demo-container">
    <p class="demo-desc">
      You can customize the icon and color of the pop confirm by setting the <code>icon</code> and <code>icon-color</code> properties to make the operation semantics clearer.
    </p>
    
    <div class="demo-block">
      <div class="block-item">
        <t-pop-confirm 
          content="Are you sure you want to delete this record?" 
          icon="delete" 
          icon-color="#ff4d4f"
        >
          <t-button type="danger">Delete Operation</t-button>
        </t-pop-confirm>
        <span class="icon-desc">Delete Icon - Red</span>
      </div>
      
      <div class="block-item">
        <t-pop-confirm 
          content="Are you sure you want to save the changes?" 
          icon="success-to" 
          icon-color="#52c41a"
        >
          <t-button type="success">Save Operation</t-button>
        </t-pop-confirm>
        <span class="icon-desc">Success Icon - Green</span>
      </div>
      
      <div class="block-item">
        <t-pop-confirm 
          content="Are you sure you want to perform this operation?" 
          icon="information" 
          icon-color="#1890ff"
        >
          <t-button type="primary">Info Operation</t-button>
        </t-pop-confirm>
        <span class="icon-desc">Information Icon - Blue</span>
      </div>
      
      <div class="block-item">
        <t-pop-confirm 
          content="This operation may be risky, do you want to continue?" 
          icon="illustrate" 
          icon-color="#faad14"
        >
          <t-button type="warning">Warning Operation</t-button>
        </t-pop-confirm>
        <span class="icon-desc">Warning Icon - Yellow</span>
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
  gap: 24px;
}

.block-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.icon-desc {
  font-size: 12px;
  color: #909399;
}
</style> 