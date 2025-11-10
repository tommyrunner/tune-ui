<template>
  <div class="list-view-demo">
    <t-list-view :listData="listData" :height="300" :itemFixed="handleItemFixed">
      <template #default="data">
        <div class="list-item" :class="{ 'is-fixed': data?.index % 5 === 0 }">
          {{ data?.index + 1 }}. {{ data?.row?.label }}
          <span v-if="data?.index % 5 === 0" class="fixed-tag">Fixed</span>
        </div>
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

// Determine if item is fixed
const handleItemFixed = index => {
  return index % 5 === 0; // Fix one item every 5 items
};
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

.list-item.is-fixed {
  background-color: #f0f9ff;
  font-weight: 500;
}

.fixed-tag {
  float: right;
  padding: 2px 8px;
  background: #3b82f6;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
}
</style>
