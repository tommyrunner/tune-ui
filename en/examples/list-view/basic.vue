<template>
  <div class="list-view-demo">
    <t-list-view :listData="listData" :height="300">
      <template #default="data">
        <div class="list-item">{{ data?.index + 1 }}. {{ data?.row?.label }}</div>
      </template>
    </t-list-view>
  </div>
</template>

<script setup>
// Generate example data
const listData = Array.from({ length: 50 }, (_, index) => ({
  id: index,
  label: `List Item ${index + 1}`
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
