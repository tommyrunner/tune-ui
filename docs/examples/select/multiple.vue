<template>
  <div class="demo-select">
    <div class="multiple-example">
      <t-select v-model="value" :options="options" multiple placeholder="请选择多个选项" />
      <div class="value-display">当前值: {{ value }}</div>
    </div>

    <div class="multiple-features">
      <div class="feature-item">
        <p class="feature-label">可过滤多选</p>
        <t-select v-model="filterValue" :options="options" filterable multiple placeholder="可输入内容过滤" />
      </div>

      <div class="feature-item">
        <p class="feature-label">自定义视图</p>
        <t-select v-model="customValue" :options="options" multiple placeholder="自定义多选视图">
          <template #multiple-view="{ model }">
            <t-tag size="small" type="info">已选 {{ Array.isArray(model) ? model.length : 0 }} 项</t-tag>
          </template>
        </t-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TSelect, TTag } from "tune-ui";

const value = ref([]);
const filterValue = ref([]);
const customValue = ref([]);

const options = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" },
  { label: "选项5", value: "5" },
  { label: "选项6", value: "6" }
];
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.multiple-example {
  margin-bottom: 16px;
}

.multiple-features {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.feature-item {
  min-width: 200px;
}

.feature-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}

.value-display {
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}
</style>
