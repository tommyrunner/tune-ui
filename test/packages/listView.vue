<template>
  <div class="test-container">
    <h2>ListView 列表视图组件</h2>

    <!-- 基础列表 -->
    <test-section title="基础列表">
      <div class="list-row">
        <t-list-view :listData="basicData" :height="300">
          <template #default="{ row, index }">
            <div class="list-item">{{ index + 1 }}. {{ row.label }}</div>
          </template>
        </t-list-view>
      </div>
    </test-section>

    <!-- 虚拟列表 -->
    <test-section title="虚拟列表">
      <div class="list-row">
        <t-list-view
          :listData="largeData"
          :height="300"
          :itemHeight="50"
          :isVirtualized="true"
          @scroll="handleScroll"
          @update-view="handleUpdateView"
        >
          <template #default="{ row, index }">
            <div class="list-item">{{ index + 1 }}. {{ row.label }}</div>
          </template>
        </t-list-view>
        <div class="control-panel">
          <div class="value-display">数据总数: {{ largeData.length }} 条</div>
          <div class="event-log">
            <div class="event-title">事件记录:</div>
            <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
              {{ event }}
            </div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 固定项列表 -->
    <test-section title="固定项列表">
      <div class="list-row">
        <t-list-view :listData="basicData" :height="300" :itemFixed="handleItemFixed">
          <template #default="{ row, index }">
            <div class="list-item" :class="{ 'is-fixed': index % 5 === 0 }">
              {{ index + 1 }}. {{ row.label }}
              <span v-if="index % 5 === 0" class="fixed-tag">固定</span>
            </div>
          </template>
        </t-list-view>
      </div>
    </test-section>

    <!-- 列表插槽 -->
    <test-section title="列表插槽">
      <div class="list-row">
        <t-list-view :listData="basicData" :height="300">
          <template #head>
            <div class="list-header">列表头部</div>
          </template>
          <template #default="{ row, index }">
            <div class="list-item">{{ index + 1 }}. {{ row.label }}</div>
          </template>
          <template #footer>
            <div class="list-footer">列表底部</div>
          </template>
        </t-list-view>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TListView } from "@/packages/list-view";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "ListViewTest" });

/** 基础数据列表 */
const basicData = ref(
  Array.from({ length: 50 }, (_, index) => ({
    id: index,
    label: `列表项 ${index + 1}`
  }))
);

/** 大数据列表 - 用于测试虚拟滚动 */
const largeData = ref(
  Array.from({ length: 10000 }, (_, index) => ({
    id: index,
    label: `列表项 ${index + 1}`
  }))
);

/** 事件记录列表 */
const eventLogs = ref<string[]>([]);

/**
 * 处理列表滚动事件
 * @param element 滚动容器元素
 */
const handleScroll = (element: HTMLElement) => {
  eventLogs.value.unshift(`滚动事件: { scrollTop: ${element.scrollTop} }`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * 处理视图更新事件
 * @param element 列表容器元素
 */
const handleUpdateView = (element: HTMLElement) => {
  eventLogs.value.unshift(`视图更新: ${element.children.length} 个元素`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * 处理固定项判断
 * @param index 项目索引
 */
const handleItemFixed = (index: number) => {
  return index % 5 === 0;
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
  }

  .list-row {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 16px;

    .t-listView {
      width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      overflow: hidden;
    }
  }

  .list-item {
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f3f4f6;
    }

    &.is-fixed {
      background-color: #ebf5ff;
      font-weight: 500;
    }

    .fixed-tag {
      float: right;
      padding: 3px 8px;
      background: #2563eb;
      color: #fff;
      border-radius: 4px;
      font-size: 12px;
    }
  }

  .list-header,
  .list-footer {
    padding: 14px 16px;
    background: #f8fafc;
    font-weight: 500;
    text-align: center;
    color: #4b5563;
    border-bottom: 1px solid #e5e7eb;
  }

  .control-panel {
    width: 300px;

    .value-display {
      margin-bottom: 16px;
      padding: 8px 12px;
      background-color: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      color: #4b5563;
    }

    .event-log {
      padding: 16px;
      background-color: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 6px;

      .event-title {
        margin-bottom: 12px;
        font-weight: 600;
        color: #374151;
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
}
</style>
