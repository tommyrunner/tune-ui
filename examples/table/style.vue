<template>
  <div class="table-demo">
    <div class="style-options">
      <div class="option-item">
        <span class="option-label">表头背景色:</span>
        <t-color-picker v-model="headBgColor" size="small" />
      </div>
      <div class="option-item">
        <span class="option-label">表尾背景色:</span>
        <t-color-picker v-model="footBgColor" size="small" />
      </div>
      <div class="option-item">
        <span class="option-label">悬浮背景色:</span>
        <t-color-picker v-model="hoverBgColor" size="small" />
      </div>
      <div class="option-item">
        <span class="option-label">边框颜色:</span>
        <t-color-picker v-model="borderColor" size="small" />
      </div>
      <div class="option-item">
        <span class="option-label">斑马纹:</span>
        <t-switch v-model="stripe" size="small" />
      </div>
    </div>
    <t-table
      :columns="columns"
      :data="tableData"
      :headBgColor="headBgColor"
      :footBgColor="footBgColor"
      :hoverBgColor="hoverBgColor"
      :border="borderColor"
      :stripe="stripe"
      :dbClickAutoWidth="true"
      summary
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

// 样式配置
const headBgColor = ref("#f8fafc");
const footBgColor = ref("#f8fafc");
const hoverBgColor = ref("#f3f4f6");
const borderColor = ref("#e5e7eb");
const stripe = ref(true);

// 列配置
const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "名称", width: 120 },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "status", label: "状态", width: 100 },
  { prop: "department", label: "部门", width: 120 },
  { prop: "address", label: "地址" }
];

// 表格数据
const tableData = [
  {
    id: 1,
    name: "张三",
    age: 25,
    status: "在线",
    department: "研发部",
    address: "北京市朝阳区"
  },
  {
    id: 2,
    name: "李四",
    age: 30,
    status: "离线",
    department: "产品部",
    address: "上海市浦东新区"
  },
  {
    id: 3,
    name: "王五",
    age: 28,
    status: "在线",
    department: "设计部",
    address: "广州市天河区"
  },
  {
    id: 4,
    name: "赵六",
    age: 32,
    status: "忙碌",
    department: "市场部",
    address: "深圳市南山区"
  },
  {
    id: 5,
    name: "钱七",
    age: 26,
    status: "在线",
    department: "运营部",
    address: "杭州市西湖区"
  }
];
</script>

<style scoped>
.table-demo {
  width: 100%;
}

.style-options {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  gap: 16px;
}

.option-item {
  display: flex;
  align-items: center;
}

.option-label {
  margin-right: 8px;
  font-size: 14px;
  color: #4b5563;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
}
</style>
