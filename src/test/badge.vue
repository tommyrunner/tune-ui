<template>
  <div class="test-container">
    <h2>Badge 徽章组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-badge :value="value">
        <div class="badge-box">徽章内容</div>
      </t-badge>
    </test-section>

    <!-- 小圆点 -->
    <test-section title="小圆点">
      <t-badge :value="value" isDot>
        <div class="badge-box">小圆点徽章</div>
      </t-badge>
    </test-section>

    <!-- 最大值 -->
    <test-section title="最大值">
      <div class="badge-group">
        <t-badge :value="value" :max="99">
          <div class="badge-box">最大值99</div>
        </t-badge>
        <t-badge :value="value" :max="10">
          <div class="badge-box">最大值10</div>
        </t-badge>
      </div>
    </test-section>

    <!-- 自定义颜色 -->
    <test-section title="自定义颜色">
      <div class="badge-group">
        <t-badge :value="value" color="#1890ff">
          <div class="badge-box">蓝色徽章</div>
        </t-badge>
        <t-badge :value="value" color="#52c41a">
          <div class="badge-box">绿色徽章</div>
        </t-badge>
        <t-badge :value="value" color="#722ed1">
          <div class="badge-box">紫色徽章</div>
        </t-badge>
      </div>
    </test-section>

    <!-- 位置偏移 -->
    <test-section title="位置偏移">
      <div class="badge-group">
        <t-badge :value="value" :offsetX="10" :offsetY="10">
          <div class="badge-box">向右下偏移</div>
        </t-badge>
        <t-badge :value="value" :offsetX="-10" :offsetY="-10">
          <div class="badge-box">向左上偏移</div>
        </t-badge>
      </div>
    </test-section>

    <!-- 动态控制 -->
    <test-section title="动态控制">
      <div class="badge-control">
        <div class="control-item">
          <t-badge :value="controlValue" :hiddenValue="0">
            <div class="badge-box">当前值: {{ controlValue }}</div>
          </t-badge>
        </div>
        <div class="control-buttons">
          <t-button @click="handleDecrease">-</t-button>
          <t-button @click="handleIncrease">+</t-button>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TBadge } from "@/packages/badge";
import { TButton } from "@/packages/button";
import TestSection from "./components/test-section.vue";

defineOptions({ name: "BadgeTest" });

// 固定值
const value = ref(100);

// 控制值
const controlValue = ref(5);

/**
 * 处理增加按钮点击
 */
const handleIncrease = () => {
  controlValue.value++;
};

/**
 * 处理减少按钮点击
 */
const handleDecrease = () => {
  if (controlValue.value > 0) {
    controlValue.value--;
  }
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
  }

  .badge-box {
    width: 100px;
    height: 100px;
    background: #f0f0f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }

  .badge-group {
    display: flex;
    gap: 40px;
  }

  .badge-control {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;

    .control-buttons {
      display: flex;
      gap: 8px;
    }
  }
}
</style>
