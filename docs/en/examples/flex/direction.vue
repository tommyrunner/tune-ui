<template>
  <div class="demo-container">
    <p class="demo-desc">
      Control the arrangement direction of elements within the Flex container by setting the direction property.
    </p>

    <div class="demo-section">
      <h4>row (default): Horizontal arrangement from left to right</h4>
      <t-flex direction="row" class="demo-flex">
        <div class="flex-item">1</div>
        <div class="flex-item">2</div>
        <div class="flex-item">3</div>
      </t-flex>
    </div>

    <div class="demo-section">
      <h4>row-reverse: Horizontal arrangement from right to left</h4>
      <t-flex direction="row-reverse" class="demo-flex">
        <div class="flex-item">1</div>
        <div class="flex-item">2</div>
        <div class="flex-item">3</div>
      </t-flex>
    </div>

    <div class="demo-section">
      <h4>column: Vertical arrangement from top to bottom</h4>
      <t-flex direction="column" class="demo-flex">
        <div class="flex-item">1</div>
        <div class="flex-item">2</div>
        <div class="flex-item">3</div>
      </t-flex>
    </div>

    <div class="demo-section">
      <h4>column-reverse: Vertical arrangement from bottom to top</h4>
      <t-flex direction="column-reverse" class="demo-flex">
        <div class="flex-item">1</div>
        <div class="flex-item">2</div>
        <div class="flex-item">3</div>
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

.flex-item {
  background-color: #409eff;
  color: white;
  text-align: center;
  padding: 12px 20px;
  border-radius: 4px;
  margin: 4px;
  min-width: 60px;
}
</style> 