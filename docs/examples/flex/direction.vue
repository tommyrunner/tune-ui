<template>
  <div class="demo-container">
    <p class="demo-desc">通过设置 direction 属性控制 Flex 容器内元素的排列方向。</p>
    
    <div class="demo-section">
      <h4>row（默认）：从左到右水平排列</h4>
      <t-flex direction="row" class="demo-flex">
        <div class="flex-item">1</div>
        <div class="flex-item">2</div>
        <div class="flex-item">3</div>
      </t-flex>
    </div>
    
    <div class="demo-section">
      <h4>row-reverse：从右到左水平排列</h4>
      <t-flex direction="row-reverse" class="demo-flex">
        <div class="flex-item">1</div>
        <div class="flex-item">2</div>
        <div class="flex-item">3</div>
      </t-flex>
    </div>
    
    <div class="demo-section">
      <h4>column：从上到下垂直排列</h4>
      <t-flex direction="column" class="demo-flex">
        <div class="flex-item">1</div>
        <div class="flex-item">2</div>
        <div class="flex-item">3</div>
      </t-flex>
    </div>
    
    <div class="demo-section">
      <h4>column-reverse：从下到上垂直排列</h4>
      <t-flex direction="column-reverse" class="demo-flex">
        <div class="flex-item">1</div>
        <div class="flex-item">2</div>
        <div class="flex-item">3</div>
      </t-flex>
    </div>
  </div>
</template>

<script setup>
import { TFlex } from "tune-ui";
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