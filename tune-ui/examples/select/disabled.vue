<template>
  <div class="demo-select">
    <div class="disable-row">
      <div class="disable-item">
        <p class="disable-label">整体禁用</p>
        <t-select v-model="value" :options="options" disabled placeholder="整体禁用状态" />
      </div>

      <div class="disable-item">
        <p class="disable-label">部分选项禁用</p>
        <t-select v-model="value" :options="disabledOptions" placeholder="部分选项禁用" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");

// 基础选项数据
const options = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" }
];

// 带禁用选项
const disabledOptions = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2", disabled: true },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4", disabled: true }
];
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.disable-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.disable-item {
  min-width: 200px;
}

.disable-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}
</style>
