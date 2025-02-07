<template>
  <div class="test-container">
    <h2>Flex 布局组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-flex-group>
        <t-flex :span="5">
          <div class="flex-item">span: 5 (50%)</div>
        </t-flex>
        <t-flex :span="5">
          <div class="flex-item">span: 5 (50%)</div>
        </t-flex>
      </t-flex-group>
    </test-section>

    <!-- 栅格配置 -->
    <test-section title="栅格配置">
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
    </test-section>

    <!-- 排序 -->
    <test-section title="排序">
      <t-flex-group>
        <t-flex :span="3" :sort="3">
          <div class="flex-item">sort: 3</div>
        </t-flex>
        <t-flex :span="3" :sort="1">
          <div class="flex-item">sort: 1</div>
        </t-flex>
        <t-flex :span="3" :sort="2">
          <div class="flex-item">sort: 2</div>
        </t-flex>
      </t-flex-group>
    </test-section>

    <!-- 对齐方式 -->
    <test-section title="对齐方式">
      <p class="section-desc">水平对齐</p>
      <t-flex-group align="center" style="height: 100px; background: #f5f5f5">
        <t-flex :span="3">
          <div class="flex-item">align: center</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">align: center</div>
        </t-flex>
      </t-flex-group>

      <p class="section-desc">垂直对齐</p>
      <t-flex-group justify="space-between">
        <t-flex :span="3">
          <div class="flex-item">justify: space-between</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">justify: space-between</div>
        </t-flex>
      </t-flex-group>
    </test-section>

    <!-- 间距设置 -->
    <test-section title="间距设置">
      <t-flex-group :gap="24">
        <t-flex :span="3">
          <div class="flex-item">gap: 24px</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 24px</div>
        </t-flex>
        <t-flex :span="3">
          <div class="flex-item">gap: 24px</div>
        </t-flex>
      </t-flex-group>
    </test-section>

    <!-- 响应式布局 -->
    <test-section title="响应式布局">
      <!-- 单个响应式 -->
      <t-flex-group>
        <t-flex :span="10" :xs="10" :sm="8" :md="6" :lg="4" :xl="3">
          <div class="flex-item">
            <p>响应式变化:</p>
            <ul>
              <li>xs: 10 (＜768px)</li>
              <li>sm: 8 (≥768px)</li>
              <li>md: 6 (≥992px)</li>
              <li>lg: 4 (≥1200px)</li>
              <li>xl: 3 (≥1920px)</li>
            </ul>
          </div>
        </t-flex>
      </t-flex-group>

      <!-- 多行响应式 -->
      <p class="section-desc">多行响应式布局</p>
      <t-flex-group :gap="16">
        <t-flex v-for="i in 6" :key="i" :xs="10" :sm="5" :md="4" :lg="3" :xl="2">
          <div class="flex-item">
            <p>Item {{ i }}</p>
            <ul>
              <li>xs: 10 - 每行1个</li>
              <li>sm: 5 - 每行2个</li>
              <li>md: 4 - 每行2-3个</li>
              <li>lg: 3 - 每行3-4个</li>
              <li>xl: 2 - 每行5个</li>
            </ul>
          </div>
        </t-flex>
      </t-flex-group>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { TFlex, TFlexGroup } from "@/packages/flex";
import TestSection from "./components/test-section.vue";

defineOptions({ name: "FlexTest" });
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
  }

  .section-desc {
    margin: 16px 0 8px;
    color: #666;
  }

  .flex-item {
    padding: 20px;
    text-align: center;
    background-color: #e5edff;
    border: 1px solid #c6d9ff;
    border-radius: 4px;

    p {
      margin: 0 0 8px;
      font-weight: 500;
    }

    ul {
      margin: 0;
      padding-left: 20px;
      text-align: left;

      li {
        margin: 4px 0;
        color: #666;
      }
    }
  }
}
</style>
