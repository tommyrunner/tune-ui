<template>
  <div class="scrollbar-test">
    <h3>Scrollbar 滚动条</h3>

    <!-- 基础用法 -->
    <div class="test-section">
      <h4>基础用法</h4>
      <t-scrollbar style="height: 300px">
        <div class="box"></div>
      </t-scrollbar>
    </div>

    <!-- Props 测试 -->
    <div class="test-section">
      <h4>Props 属性</h4>
      <div class="test-item">
        <p class="test-item-title">permanent - 常驻滚动条</p>
        <t-scrollbar style="height: 300px" :permanent="true">
          <div class="box"></div>
        </t-scrollbar>
      </div>
    </div>

    <!-- Events 测试 -->
    <div class="test-section">
      <h4>Events 事件</h4>

      <!-- 垂直滚动事件 -->
      <div class="test-item">
        <p class="test-item-title">scroll-y - 垂直滚动事件</p>
        <t-scrollbar style="height: 300px" @scroll-y="handleScrollY">
          <div class="box"></div>
        </t-scrollbar>
        <div class="event-info">
          <p>垂直滚动位置: {{ scrollYInfo }}px</p>
        </div>
      </div>

      <!-- 水平滚动事件 -->
      <div class="test-item">
        <p class="test-item-title">scroll-x - 水平滚动事件</p>
        <t-scrollbar style="height: 300px" @scroll-x="handleScrollX">
          <div class="box horizontal"></div>
        </t-scrollbar>
        <div class="event-info">
          <p>水平滚动位置: {{ scrollXInfo }}px</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TScrollbar } from "@/packages/scrollbar";

// 滚动事件信息
const scrollYInfo = ref(0);
const scrollXInfo = ref(0);

/**
 * 处理垂直滚动
 */
const handleScrollY = (element: HTMLElement) => {
  scrollYInfo.value = element.scrollTop;
};

/**
 * 处理水平滚动
 */
const handleScrollX = (element: HTMLElement) => {
  scrollXInfo.value = element.scrollLeft;
};
</script>

<style lang="scss" scoped>
.scrollbar-test {
  padding: 20px;

  h3 {
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 500;
    color: #1f2937;
  }

  .test-section {
    margin-bottom: 32px;

    h4 {
      margin: 0 0 16px;
      font-size: 18px;
      font-weight: 500;
      color: #374151;
    }
  }

  .test-item {
    padding: 16px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    & + .test-item {
      margin-top: 16px;
    }

    .test-item-title {
      margin: 0 0 12px;
      font-size: 14px;
      color: #6b7280;
    }
  }

  .box {
    width: 100%;
    height: 1000px;
    background: linear-gradient(180deg, #e6f7ff 0%, #ffffff 100%);
    border: 1px solid #e5e7eb;
    border-radius: 4px;

    &.horizontal {
      width: 2000px;
      height: 100%;
      background: linear-gradient(90deg, #e6f7ff 0%, #ffffff 100%);
    }
  }

  .event-info {
    margin-top: 12px;
    padding: 12px;
    background: #f3f4f6;
    border-radius: 4px;
    font-size: 14px;

    p {
      margin: 4px 0;
      color: #4b5563;
    }
  }
}
</style>
