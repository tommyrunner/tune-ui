<template>
  <div class="demo-container">
    <p class="demo-desc">通过 wrap 属性控制 Flex 容器内元素是否可以换行。</p>
    
    <div class="demo-section">
      <h4>nowrap（默认）：不换行，可能会导致元素溢出</h4>
      <t-flex wrap="nowrap" class="demo-flex limited-width">
        <div class="flex-item">项目 1</div>
        <div class="flex-item">项目 2</div>
        <div class="flex-item">项目 3</div>
        <div class="flex-item">项目 4</div>
        <div class="flex-item">项目 5</div>
        <div class="flex-item">项目 6</div>
      </t-flex>
    </div>
    
    <div class="demo-section">
      <h4>wrap：换行，从上到下</h4>
      <t-flex wrap="wrap" class="demo-flex limited-width">
        <div class="flex-item">项目 1</div>
        <div class="flex-item">项目 2</div>
        <div class="flex-item">项目 3</div>
        <div class="flex-item">项目 4</div>
        <div class="flex-item">项目 5</div>
        <div class="flex-item">项目 6</div>
      </t-flex>
    </div>
    
    <div class="demo-section">
      <h4>wrap-reverse：换行，从下到上</h4>
      <t-flex wrap="wrap-reverse" class="demo-flex limited-width">
        <div class="flex-item">项目 1</div>
        <div class="flex-item">项目 2</div>
        <div class="flex-item">项目 3</div>
        <div class="flex-item">项目 4</div>
        <div class="flex-item">项目 5</div>
        <div class="flex-item">项目 6</div>
      </t-flex>
    </div>
    
    <div class="demo-section">
      <h4>使用布尔值：true 等同于 "wrap"</h4>
      <t-flex :wrap="true" class="demo-flex limited-width">
        <div class="flex-item">项目 1</div>
        <div class="flex-item">项目 2</div>
        <div class="flex-item">项目 3</div>
        <div class="flex-item">项目 4</div>
        <div class="flex-item">项目 5</div>
        <div class="flex-item">项目 6</div>
      </t-flex>
    </div>
    
    <div class="demo-section">
      <h4>结合 alignContent 控制多行对齐（space-between）</h4>
      <t-flex wrap="wrap" align-content="space-between" class="demo-flex limited-width height-200">
        <div class="flex-item">项目 1</div>
        <div class="flex-item">项目 2</div>
        <div class="flex-item">项目 3</div>
        <div class="flex-item">项目 4</div>
        <div class="flex-item">项目 5</div>
        <div class="flex-item">项目 6</div>
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