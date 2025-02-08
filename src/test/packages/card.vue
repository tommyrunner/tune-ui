<template>
  <div class="test-container">
    <h2>Card 卡片组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-card>
        <div class="card-content">基础卡片内容</div>
      </t-card>
    </test-section>

    <!-- 卡片标题 -->
    <test-section title="卡片标题">
      <div class="card-group">
        <t-card title="标题文本">
          <div class="card-content">带标题的卡片</div>
        </t-card>
        <t-card title="带图标的标题" titleIcon="info">
          <div class="card-content">带图标和标题的卡片</div>
        </t-card>
      </div>
    </test-section>

    <!-- 阴影显示 -->
    <test-section title="阴影显示">
      <div class="card-group">
        <t-card shadow="always" title="总是显示">
          <div class="card-content">总是显示阴影</div>
        </t-card>
        <t-card shadow="hover" title="悬浮显示">
          <div class="card-content">悬浮时显示阴影</div>
        </t-card>
        <t-card shadow="never" title="从不显示">
          <div class="card-content">从不显示阴影</div>
        </t-card>
      </div>
    </test-section>

    <!-- 插槽用法 -->
    <test-section title="插槽用法">
      <t-card>
        <template #headLeft>
          <div class="custom-header">
            <t-icon icon="home" />
            <span>自定义头部左侧</span>
          </div>
        </template>
        <template #headRight>
          <t-button size="small">操作按钮</t-button>
        </template>
        <div class="card-content">卡片主体内容</div>
        <template #foot>
          <div class="custom-footer">
            <span>自定义底部内容</span>
            <t-button type="primary" size="small">确认</t-button>
          </div>
        </template>
      </t-card>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { TCard } from "@/packages/card";
import { TIcon } from "@/packages/icon";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "CardTest" });
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
  }

  .card-group {
    display: flex;
    gap: 20px;
  }

  .card-content {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }

  .custom-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .custom-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #666;
  }
}
</style>
