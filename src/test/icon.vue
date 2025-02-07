<template>
  <div class="test-container">
    <h2>Icon 图标组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="icon-list">
        <div class="icon-item">
          <t-icon icon="search" />
          <span>search</span>
        </div>
        <div class="icon-item">
          <t-icon icon="link" />
          <span>link</span>
        </div>
        <div class="icon-item">
          <t-icon icon="map" />
          <span>map</span>
        </div>
        <div class="icon-item">
          <t-icon icon="filter" />
          <span>filter</span>
        </div>
        <div class="icon-item">
          <t-icon icon="reduce" />
          <span>reduce</span>
        </div>
      </div>
    </test-section>

    <!-- 图标大小 -->
    <test-section title="图标大小">
      <div class="icon-list">
        <div class="icon-item">
          <t-icon icon="position" :size="16" />
          <span>size: 16px</span>
        </div>
        <div class="icon-item">
          <t-icon icon="position" :size="24" />
          <span>size: 24px</span>
        </div>
        <div class="icon-item">
          <t-icon icon="position" :size="32" />
          <span>size: 32px</span>
        </div>
      </div>
    </test-section>

    <!-- 图标颜色 -->
    <test-section title="图标颜色">
      <div class="icon-list">
        <div class="icon-item">
          <t-icon icon="info" color="#3b82f6" />
          <span>color: #3b82f6</span>
        </div>
        <div class="icon-item">
          <t-icon icon="info" color="#10b981" />
          <span>color: #10b981</span>
        </div>
        <div class="icon-item">
          <t-icon icon="info" color="#ef4444" />
          <span>color: #ef4444</span>
        </div>
      </div>
    </test-section>

    <!-- 主题类型 -->
    <test-section title="主题类型">
      <div class="icon-list">
        <div class="icon-item">
          <t-icon icon="close" type="primary" />
          <span>primary</span>
        </div>
        <div class="icon-item">
          <t-icon icon="close" type="success" />
          <span>success</span>
        </div>
        <div class="icon-item">
          <t-icon icon="close" type="info" />
          <span>info</span>
        </div>
        <div class="icon-item">
          <t-icon icon="close" type="warning" />
          <span>warning</span>
        </div>
        <div class="icon-item">
          <t-icon icon="close" type="danger" />
          <span>danger</span>
        </div>
      </div>
    </test-section>

    <!-- 自定义图标 -->
    <test-section title="自定义图标">
      <div class="icon-list">
        <div class="icon-item">
          <t-icon icon="right-circle" custom-icon="custom-icon" />
          <span>custom-icon (需要引入外部链接)</span>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { TIcon } from "@/packages/icon";
import TestSection from "./components/test-section.vue";

defineOptions({ name: "IconTest" });
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
  }

  .icon-list {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 100px;

    span {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
