<template>
  <div class="demo-container">
    <p class="demo-desc">使用 gap 属性设置元素之间的间距。</p>

    <div class="demo-block">
      <h4 class="section-title">无间距（默认）</h4>
      <t-flex-group :gap="0">
        <t-flex :span="3">
          <div class="flex-item">gap: 0</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 0</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 0</div>
        </t-flex>
      </t-flex-group>
    </div>

    <div class="demo-block">
      <h4 class="section-title">间距 8px</h4>
      <t-flex-group :gap="8">
        <t-flex :span="3">
          <div class="flex-item">gap: 8</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 8</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 8</div>
        </t-flex>
      </t-flex-group>
    </div>

    <div class="demo-block">
      <h4 class="section-title">间距 16px</h4>
      <t-flex-group :gap="16">
        <t-flex :span="3">
          <div class="flex-item">gap: 16</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 16</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 16</div>
        </t-flex>
      </t-flex-group>
    </div>

    <div class="demo-block">
      <h4 class="section-title">间距 24px</h4>
      <t-flex-group :gap="24">
        <t-flex :span="3">
          <div class="flex-item">gap: 24</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 24</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 24</div>
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

.section-title {
  margin: 0 0 12px;
  font-size: 16px;
  color: #606266;
}

.flex-item {
  padding: 16px;
  text-align: center;
  background-color: #e5edff;
  border: 1px solid #c6d9ff;
  border-radius: 4px;
}
</style> 