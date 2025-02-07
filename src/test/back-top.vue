<template>
  <div class="test-container">
    <h2>BackTop 回到顶部组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-back-top target=".test-container" :visibilityHeight="100" />
      <div class="scroll-content">
        <div v-for="i in 50" :key="i" class="scroll-item">滚动内容 {{ i }}</div>
      </div>
    </test-section>

    <!-- 自定义图标 -->
    <test-section title="自定义图标">
      <t-back-top target=".test-container" :visibilityHeight="100" icon="arrow-up" :iconSize="24" />
      <div class="scroll-content">
        <div v-for="i in 50" :key="i" class="scroll-item">滚动内容 {{ i }}</div>
      </div>
    </test-section>

    <!-- 自定义位置 -->
    <test-section title="自定义位置">
      <t-back-top target=".test-container" :visibilityHeight="100" right="100px" bottom="100px" />
      <div class="scroll-content">
        <div v-for="i in 50" :key="i" class="scroll-item">滚动内容 {{ i }}</div>
      </div>
    </test-section>

    <!-- 朴素样式 -->
    <test-section title="朴素样式">
      <t-back-top target=".test-container" :visibilityHeight="100" plain />
      <div class="scroll-content">
        <div v-for="i in 50" :key="i" class="scroll-item">滚动内容 {{ i }}</div>
      </div>
    </test-section>

    <!-- 自定义内容 -->
    <test-section title="自定义内容">
      <t-back-top target=".test-container" :visibilityHeight="100">
        <div class="custom-content">
          <t-icon name="arrow-up" />
          <span>顶部</span>
        </div>
      </t-back-top>
      <div class="scroll-content">
        <div v-for="i in 50" :key="i" class="scroll-item">滚动内容 {{ i }}</div>
      </div>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-back-top target=".test-container" :visibilityHeight="100" @click="handleClick" />
      <div class="scroll-content">
        <div v-for="i in 50" :key="i" class="scroll-item">滚动内容 {{ i }}</div>
      </div>
      <div class="event-log">
        <div class="event-title">事件记录:</div>
        <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
          {{ event }}
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TBackTop } from "@/packages/back-top";
import { TIcon } from "@/packages/icon";
import TestSection from "./components/test-section.vue";

defineOptions({ name: "BackTopTest" });

// 事件记录
const eventLogs = ref<string[]>([]);

/**
 * 处理点击事件
 */
const handleClick = () => {
  eventLogs.value.unshift("点击回到顶部按钮");
  // 只保留最近5条记录
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;
  height: 600px;
  overflow: auto;

  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
  }

  .scroll-content {
    height: 200px;
    overflow: auto;
    border: 1px solid #eee;
    border-radius: 4px;

    .scroll-item {
      padding: 10px;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .custom-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: #666;
    font-size: 12px;
  }

  .event-log {
    margin-top: 16px;
    padding: 12px;
    background-color: #f9fafb;
    border-radius: 4px;

    .event-title {
      margin-bottom: 8px;
      font-weight: 500;
      color: #374151;
    }

    .event-item {
      padding: 4px 0;
      color: #666;
      font-size: 14px;
      font-family: monospace;
    }
  }
}
</style>
