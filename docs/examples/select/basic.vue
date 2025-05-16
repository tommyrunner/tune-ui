<template>
  <div class="demo-select">
    <t-select v-model="value" :options="options" placeholder="请选择" />
    <div class="value-display">当前值: {{ value }}</div>

    <div class="type-examples">
      <div class="type-item">
        <p class="type-label">输入框类型</p>
        <t-select v-model="typeValue" :options="options" type="input" placeholder="请选择" />
      </div>
      <div class="type-item">
        <p class="type-label">文本类型</p>
        <t-select v-model="typeValue" :options="options" type="text" placeholder="请选择" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TSelect } from "tune-ui";

const value = ref("");
const typeValue = ref("");

const options = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" }
];
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.value-display {
  padding: 6px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}

.type-examples {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.type-item {
  min-width: 200px;
}

.type-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 6px;
}
</style>
