<template>
  <div class="demo-container">
    <p class="demo-desc">Control whether elements in the Flex container can wrap through the wrap property.</p>
    
    <div class="demo-section">
      <h4>nowrap (default): No wrapping, may cause element overflow</h4>
      <t-flex wrap="nowrap" class="demo-flex limited-width">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
        <div class="flex-item">Item 4</div>
        <div class="flex-item">Item 5</div>
        <div class="flex-item">Item 6</div>
      </t-flex>
    </div>
    
    <div class="demo-section">
      <h4>wrap: Wrap from top to bottom</h4>
      <t-flex wrap="wrap" class="demo-flex limited-width">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
        <div class="flex-item">Item 4</div>
        <div class="flex-item">Item 5</div>
        <div class="flex-item">Item 6</div>
      </t-flex>
    </div>
    
    <div class="demo-section">
      <h4>wrap-reverse: Wrap from bottom to top</h4>
      <t-flex wrap="wrap-reverse" class="demo-flex limited-width">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
        <div class="flex-item">Item 4</div>
        <div class="flex-item">Item 5</div>
        <div class="flex-item">Item 6</div>
      </t-flex>
    </div>
    
    <div class="demo-section">
      <h4>Using boolean value: true is equivalent to "wrap"</h4>
      <t-flex :wrap="true" class="demo-flex limited-width">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
        <div class="flex-item">Item 4</div>
        <div class="flex-item">Item 5</div>
        <div class="flex-item">Item 6</div>
      </t-flex>
    </div>
    
    <div class="demo-section">
      <h4>Combined with alignContent to control multi-line alignment (space-between)</h4>
      <t-flex wrap="wrap" align-content="space-between" class="demo-flex limited-width height-200">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
        <div class="flex-item">Item 4</div>
        <div class="flex-item">Item 5</div>
        <div class="flex-item">Item 6</div>
      </t-flex>
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

.demo-section {
  margin-bottom: 24px;
}

.demo-section h4 {
  margin: 0 0 12px;
  font-size: 16px;
  color: #303133;
}

.demo-flex {
  background-color: #f5f7fa;
  padding: 16px;
  border-radius: 4px;
}

.limited-width {
  width: 400px;
}

.height-200 {
  height: 200px;
}

.flex-item {
  background-color: #409eff;
  color: white;
  text-align: center;
  padding: 12px 8px;
  margin: 4px;
  border-radius: 4px;
  min-width: 80px;
  flex-shrink: 0;
}
</style> 