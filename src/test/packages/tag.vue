<template>
  <div class="test-container">
    <h2>Tag 标签组件</h2>

    <!-- type 类型测试 -->
    <test-section title="type 类型">
      <div class="tag-wrapper">
        <t-tag>default</t-tag>
        <t-tag type="primary">primary</t-tag>
        <t-tag type="success">success</t-tag>
        <t-tag type="info">info</t-tag>
        <t-tag type="warning">warning</t-tag>
        <t-tag type="danger">danger</t-tag>
      </div>
    </test-section>

    <!-- size 尺寸测试 -->
    <test-section title="size 尺寸">
      <div class="tag-wrapper">
        <t-tag size="small">small</t-tag>
        <t-tag size="default">default</t-tag>
        <t-tag size="large">large</t-tag>
      </div>
    </test-section>

    <!-- prefixIcon 前缀图标 -->
    <test-section title="prefixIcon 前缀图标">
      <div class="tag-wrapper">
        <t-tag prefix-icon="search">search</t-tag>
        <t-tag prefix-icon="add">add</t-tag>
        <t-tag prefix-icon="close-to">close</t-tag>
        <t-tag prefix-icon="success-to" @click-prefix="handlePrefixClick">可点击</t-tag>
      </div>
    </test-section>

    <!-- suffixIcon 后缀图标 -->
    <test-section title="suffixIcon 后缀图标">
      <div class="tag-wrapper">
        <t-tag suffix-icon="close-to">close</t-tag>
        <t-tag suffix-icon="delete">delete</t-tag>
        <t-tag suffix-icon="success-to" @click-suffix="handleSuffixClick">可点击</t-tag>
      </div>
    </test-section>

    <!-- round 圆角 -->
    <test-section title="round 圆角">
      <div class="tag-wrapper">
        <t-tag>默认圆角</t-tag>
        <t-tag round>开启圆角</t-tag>
        <t-tag round type="primary">primary圆角</t-tag>
        <t-tag round type="success">success圆角</t-tag>
      </div>
    </test-section>

    <!-- disabled 禁用 -->
    <test-section title="disabled 禁用">
      <div class="tag-wrapper">
        <t-tag disabled>禁用状态</t-tag>
        <t-tag disabled type="primary">禁用primary</t-tag>
        <t-tag disabled prefix-icon="search" @click-prefix="handlePrefixClick">禁用点击</t-tag>
        <t-tag disabled suffix-icon="close-to" @click-suffix="handleSuffixClick">禁用关闭</t-tag>
      </div>
    </test-section>

    <!-- 事件记录 -->
    <test-section title="事件记录">
      <div class="event-log">
        <div class="event-title">Event Logs</div>
        <div v-for="(log, index) in eventLogs" :key="index" class="event-item">{{ log }}</div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { TTag } from "@/packages/tag";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "TagTest" });

// 事件日志
const eventLogs = reactive<string[]>([]);

/**
 * 处理前缀图标点击
 */
const handlePrefixClick = () => {
  eventLogs.unshift("点击了前缀图标");
  if (eventLogs.length > 3) {
    eventLogs.pop();
  }
};

/**
 * 处理后缀图标点击
 */
const handleSuffixClick = () => {
  eventLogs.unshift("点击了后缀图标");
  if (eventLogs.length > 3) {
    eventLogs.pop();
  }
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 32px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
  }

  .tag-wrapper {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }

  .event-log {
    margin-top: 16px;
    padding: 16px;
    background-color: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 6px;

    .event-title {
      margin-bottom: 12px;
      font-weight: 600;
      color: #374151;
      font-size: 15px;
    }

    .event-item {
      padding: 6px 8px;
      margin-bottom: 4px;
      background-color: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-family: ui-monospace, monospace;
      font-size: 13px;
      color: #4b5563;
    }
  }
}
</style> 