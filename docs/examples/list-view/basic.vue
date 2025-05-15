<template>
  <div class="list-view-demo">
    <t-list-view :listData="listData" :height="300">
      <template #default="{ row, index }">
        <div class="list-item">{{ index + 1 }}. {{ row.label }}</div>
      </template>
    </t-list-view>
  </div>
</template>

<script setup>
import { TListView } from "tune-ui";

// 生成示例数据
const listData = Array.from({ length: 50 }, (_, index) => ({
  id: index,
  label: `列表项 ${index + 1}`
}));
</script>

<style scoped>
.list-view-demo {
  width: 100%;
}

.list-item {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.list-item:hover {
  background-color: #f9fafb;
}
</style>
