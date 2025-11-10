<template>
  <div class="table-demo">
    <t-table :columns="columns" :data="summaryData" :height="300" :summary="handleSummary" />
  </div>
</template>

<script setup>
import { reactive } from "vue";

// 列配置
const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "项目名称", width: 150 },
  { prop: "date", label: "日期", width: 120 },
  { prop: "amount", label: "金额", width: 120 },
  { prop: "status", label: "状态" }
];

// 表格数据
const summaryData = reactive([
  {
    id: 1,
    name: "项目A",
    date: "2023-01-15",
    amount: 12500,
    status: "已完成"
  },
  {
    id: 2,
    name: "项目B",
    date: "2023-02-20",
    amount: 8300,
    status: "进行中"
  },
  {
    id: 3,
    name: "项目C",
    date: "2023-03-10",
    amount: 15600,
    status: "已完成"
  },
  {
    id: 4,
    name: "项目D",
    date: "2023-04-05",
    amount: 6200,
    status: "未开始"
  },
  {
    id: 5,
    name: "项目E",
    date: "2023-05-12",
    amount: 9800,
    status: "进行中"
  }
]);

/**
 * 处理合计行
 * @param {Number} value - 列合计值
 * @param {Object} scope - 列上下文
 * @returns {String} 合计文本
 */
const handleSummary = (value, scope) => {
  const prop = scope.rowCol.prop;

  // 根据不同列显示不同合计内容
  if (prop === "id") {
    return "合计";
  } else if (prop === "amount") {
    return `¥ ${value.toLocaleString()}`;
  } else if (prop === "name") {
    return `共 ${summaryData.length} 个项目`;
  } else if (prop === "status") {
    const completed = summaryData.filter(item => item.status === "已完成").length;
    return `完成率: ${Math.round((completed / summaryData.length) * 100)}%`;
  }

  return "";
};
</script>

<style scoped>
.table-demo {
  width: 100%;
}
</style>
