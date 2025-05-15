<template>
  <div class="table-demo">
    <t-table 
      :columns="filterSortColumns" 
      :data="tableData" 
      :height="300" 
      :sortMethod="handleSort"
    />
  </div>
</template>

<script setup>
import { TTable } from "tune-ui";

// 排序和筛选列配置
const filterSortColumns = [
  { prop: "id", label: "ID", width: 80, sortable: true },
  { 
    prop: "name", 
    label: "名称", 
    width: 120,
    filters: [
      { label: "张三", value: "张三", type: "eq" },
      { label: "李四", value: "李四", type: "eq" }
    ]
  },
  { prop: "age", label: "年龄", width: 100, sortable: true },
  { 
    prop: "status", 
    label: "状态", 
    width: 100,
    filters: [
      { label: "在线", value: "在线", type: "eq" },
      { label: "离线", value: "离线", type: "eq" },
      { label: "忙碌", value: "忙碌", type: "eq" }
    ]
  },
  { prop: "address", label: "地址" }
];

// 表格数据
const tableData = [
  {
    id: 1,
    name: "张三",
    age: 25,
    status: "在线",
    address: "北京市朝阳区"
  },
  {
    id: 2,
    name: "李四",
    age: 30,
    status: "离线",
    address: "上海市浦东新区"
  },
  {
    id: 3,
    name: "王五",
    age: 28,
    status: "在线",
    address: "广州市天河区"
  },
  {
    id: 4,
    name: "赵六",
    age: 32,
    status: "忙碌",
    address: "深圳市南山区"
  },
  {
    id: 5,
    name: "钱七",
    age: 26,
    status: "在线",
    address: "杭州市西湖区"
  }
];

// 自定义排序方法
const handleSort = ({ rowA, rowB }, sortConfig) => {
  // 获取排序配置
  const config = sortConfig[0];
  if (!config) return 0;
  
  const { prop, sort } = config;
  
  // 获取比较值
  const valueA = rowA[prop];
  const valueB = rowB[prop];
  
  // 根据排序方向返回比较结果
  if (sort === "asc") {
    return valueA > valueB ? 1 : -1;
  } else if (sort === "desc") {
    return valueA < valueB ? 1 : -1;
  }
  
  return 0;
};
</script>

<style scoped>
.table-demo {
  width: 100%;
}
</style> 