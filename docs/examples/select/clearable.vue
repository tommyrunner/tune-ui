<template>
  <div class="demo-select">
    <div class="clearable-example">
      <t-select v-model="value" :options="options" clearable placeholder="点击右侧图标清空" />
    </div>

    <div class="clear-events">
      <t-select v-model="eventValue" :options="options" clearable placeholder="清空事件示例" @clear="handleClear" />
      <div class="event-log">
        <div>清空次数: {{ clearCount }}</div>
        <div>当前值: {{ eventValue }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TSelect } from "tune-ui";

const value = ref("1"); // 默认选中第一项
const eventValue = ref("2"); // 默认选中第二项
const clearCount = ref(0);

const options = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" }
];

const handleClear = () => {
  clearCount.value++;
};
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.clearable-example,
.clear-events {
  margin-bottom: 16px;
}

.event-log {
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}
</style>
