<template>
  <div class="list-view-demo">
    <t-list-view :listData="[]" :height="300" emptyText="暂无列表数据">
      <template #default="{ row, index }">
        <div class="list-item">{{ index + 1 }}. {{ row.label }}</div>
      </template>
      <template #empty>
        <div class="empty-content">
          <div class="empty-icon">📋</div>
          <div class="empty-text">列表为空，暂无数据显示</div>
        </div>
      </template>
    </t-list-view>
  </div>
</template>

<script setup>
import { TListView } from "tune-ui";
</script>

<style scoped>
.list-view-demo {
  width: 100%;
}

.list-item {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 16px;
  color: #9ca3af;
}

.empty-text {
  color: #6b7280;
  font-size: 14px;
}
</style>
