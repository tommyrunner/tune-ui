<template>
  <div class="demo-select">
    <div class="custom-row">
      <div class="custom-item">
        <p class="custom-label">自定义前缀图标</p>
        <t-select v-model="value" :options="options" placeholder="请选择用户">
          <template #prefix>
            <t-icon icon="search" />
          </template>
        </t-select>
      </div>

      <div class="custom-item">
        <p class="custom-label">自定义选项内容</p>
        <t-select v-model="customValue" :options="userOptions" placeholder="选择用户">
          <template #default="{ row }">
            <div class="user-option">
              <t-icon icon="user" />
              <span class="user-name">{{ row.label }}</span>
              <span class="user-id">ID: {{ row.value }}</span>
            </div>
          </template>
        </t-select>
      </div>
    </div>

    <div class="custom-item">
      <p class="custom-label">自定义空状态</p>
      <t-select v-model="emptyValue" :options="[]" empty-text="暂无可选项" placeholder="空状态示例">
        <template #empty>
          <div class="empty-content">
            <t-icon icon="alert" color="#f59e0b" :size="18" />
            <span>暂无数据，请添加选项</span>
          </div>
        </template>
      </t-select>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TSelect, TIcon } from "tune-ui";

const value = ref("");
const customValue = ref("");
const emptyValue = ref("");

const options = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" }
];

const userOptions = [
  { label: "张三", value: "zhangsan" },
  { label: "李四", value: "lisi" },
  { label: "王五", value: "wangwu" },
  { label: "赵六", value: "zhaoliu" }
];
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.custom-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.custom-item {
  min-width: 220px;
  margin-bottom: 12px;
}

.custom-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}

.user-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-weight: 500;
}

.user-id {
  color: #9ca3af;
  font-size: 12px;
  margin-left: auto;
}

.empty-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 0;
  color: #6b7280;
  font-size: 14px;
}
</style>
