<template>
  <div class="table-demo">
    <t-table
      :columns="columns"
      :data="tableData"
      :height="300"
      :fixedRow="handleFixedRow"
      :row-style="handleRowStyle"
    />
  </div>
</template>

<script setup>
import { TTable } from "tune-ui";

// 列配置
const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "名称", width: 120 },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "status", label: "状态", width: 100 },
  { prop: "address", label: "地址" }
];

// 表格数据
const tableData = [
  {
    id: 1,
    name: "张三",
    age: 25,
    status: "在线",
    address: "北京市朝阳区",
    important: true
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
    address: "广州市天河区",
    important: true
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
  },
  {
    id: 6,
    name: "孙八",
    age: 29,
    status: "在线",
    address: "武汉市洪山区",
    important: true
  },
  {
    id: 7,
    name: "周九",
    age: 31,
    status: "离线",
    address: "南京市鼓楼区"
  },
  {
    id: 8,
    name: "吴十",
    age: 27,
    status: "忙碌",
    address: "成都市武侯区"
  }
];

// 判断行是否固定
const handleFixedRow = (index, row) => {
  return row.important === true;
};

// 设置固定行样式
const handleRowStyle = (index, row) => {
  if (row.important) {
    return {
      backgroundColor: "#f0f9ff",
      fontWeight: "500"
    };
  }
  return {};
};
</script>

<style scoped>
.table-demo {
  width: 100%;
}
</style> 