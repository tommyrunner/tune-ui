<template>
  <div class="list-view-demo">
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
      <div class="data-info">总数据量: {{ largeData.length }} 条</div>
      <div class="event-log">
        <div class="log-title">事件记录:</div>
        <div v-for="(event, index) in eventLogs" :key="index" class="log-item">
          {{ event }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TListView } from "tune-ui";

// 生成大量数据用于虚拟滚动测试
const largeData = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  label: `列表项 ${index + 1}`
}));

// 事件日志
const eventLogs = ref([]);

// 处理滚动事件
const handleScroll = element => {
  eventLogs.value.unshift(`滚动位置: ${Math.round(element.scrollTop)}px`);
  if (eventLogs.value.length > 5) eventLogs.value.pop();
};

// 处理视图更新事件
const handleUpdateView = element => {
  eventLogs.value.unshift(`视图更新: ${element.children.length} 个元素`);
  if (eventLogs.value.length > 5) eventLogs.value.pop();
};
</script>

<style scoped>
.list-view-demo {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list-item {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;
}

.list-item:hover {
  background-color: #f9fafb;
}

.control-panel {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
}

.data-info {
  margin-bottom: 12px;
  font-weight: 500;
}

.event-log {
  padding: 12px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.log-title {
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
}

.log-item {
  padding: 6px 8px;
  margin-bottom: 4px;
  background-color: #f3f4f6;
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
}
</style>
