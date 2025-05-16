<template>
  <div class="demo-container">
    <p class="demo-desc">通过 span 和 offset 属性创建栅格布局，总栅格数为10。</p>

    <div class="demo-block">
      <t-flex-group>
        <t-flex :span="3">
          <div class="flex-item">span: 3 (30%)</div>
        </t-flex>
        <t-flex :span="4" :offset="1">
          <div class="flex-item">span: 4, offset: 1</div>
        </t-flex>
        <t-flex :span="2">
          <div class="flex-item">span: 2 (20%)</div>
        </t-flex>
      </t-flex-group>
    </div>

    <div class="demo-block">
      <t-flex-group>
        <t-flex :span="6">
          <div class="flex-item">span: 6 (60%)</div>
        </t-flex>
        <t-flex :span="4">
          <div class="flex-item">span: 4 (40%)</div>
        </t-flex>
      </t-flex-group>
    </div>

    <div class="demo-block">
      <t-flex-group>
        <t-flex :span="2">
          <div class="flex-item">span: 2</div>
        </t-flex>
        <t-flex :span="2">
          <div class="flex-item">span: 2</div>
        </t-flex>
        <t-flex :span="2">
          <div class="flex-item">span: 2</div>
        </t-flex>
        <t-flex :span="2">
          <div class="flex-item">span: 2</div>
        </t-flex>
        <t-flex :span="2">
          <div class="flex-item">span: 2</div>
        </t-flex>
      </t-flex-group>
    </div>
  </div>
</template>

<script setup>
import { TFlex, TFlexGroup } from "tune-ui";
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
  margin-bottom: 24px;
}

.flex-item {
  padding: 16px;
  text-align: center;
  background-color: #e5edff;
  border: 1px solid #c6d9ff;
  border-radius: 4px;
}
</style> 