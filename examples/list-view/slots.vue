<template>
  <div class="list-view-demo">
    <t-list-view :listData="listData" :height="300">
      <template #head>
        <div class="list-header">
          <div class="header-title">列表标题</div>
          <div class="header-subtitle">共 {{ listData.length }} 条数据</div>
        </div>
      </template>

      <template #default="data">
        <div class="list-item">
          <div class="item-index">{{ data?.index + 1 }}</div>
          <div class="item-content">{{ data?.row?.label }}</div>
        </div>
      </template>

      <template #footer>
        <div class="list-footer">
          <span>列表底部</span>
          <button class="load-more-btn">加载更多</button>
        </div>
      </template>
    </t-list-view>
  </div>
</template>

<script setup>
// 生成示例数据
const listData = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  label: `列表项内容 ${index + 1}`
}));
</script>

<style scoped>
.list-view-demo {
  width: 100%;
}

.list-header {
  padding: 14px 16px;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.header-title {
  font-weight: 600;
  font-size: 16px;
  color: #111827;
}

.header-subtitle {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

.list-item {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
}

.item-index {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border-radius: 50%;
  margin-right: 12px;
  font-size: 14px;
  color: #4b5563;
}

.list-footer {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.load-more-btn {
  background-color: #3b82f6;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.load-more-btn:hover {
  background-color: #2563eb;
}
</style>
