<template>
  <div class="list-view-demo">
    <t-list-view :listData="[]" :height="300" emptyText="No list data available">
      <template #default="data">
        <div class="list-item">{{ data?.index + 1 }}. {{ data?.row?.label }}</div>
      </template>
      <template #empty>
        <div class="empty-content">
          <div class="empty-icon">📋</div>
          <div class="empty-text">List is empty, no data to display</div>
        </div>
      </template>
    </t-list-view>
  </div>
</template>

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
