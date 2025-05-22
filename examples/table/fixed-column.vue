<template>
  <div class="table-demo">
    <t-table :columns="fixedColumns" :data="tableData" :height="300" />
  </div>
</template>

<script setup>


// 固定列配置
const fixedColumns = [
  { prop: "id", label: "ID", width: 80, fixed: "left" },
  { prop: "name", label: "姓名", width: 120 },
  { prop: "department", label: "部门", width: 120 },
  { prop: "position", label: "职位", width: 120 },
  { prop: "age", label: "年龄", width: 80 },
  { prop: "status", label: "状态", width: 100 },
  { prop: "salary", label: "薪资", width: 100 },
  { prop: "address", label: "地址", width: 200 },
  { prop: "email", label: "邮箱", width: 180, fixed: "right" }
];

// 表格数据
const tableData = [
  {
    id: 1,
    name: "张三",
    age: 25,
    status: "在线",
    department: "研发部",
    position: "前端工程师",
    salary: 15000,
    address: "北京市朝阳区",
    email: "zhangsan@example.com"
  },
  {
    id: 2,
    name: "李四",
    age: 30,
    status: "离线",
    department: "产品部",
    position: "产品经理",
    salary: 18000,
    address: "上海市浦东新区",
    email: "lisi@example.com"
  },
  {
    id: 3,
    name: "王五",
    age: 28,
    status: "在线",
    department: "设计部",
    position: "UI设计师",
    salary: 16000,
    address: "广州市天河区",
    email: "wangwu@example.com"
  },
  {
    id: 4,
    name: "赵六",
    age: 32,
    status: "忙碌",
    department: "市场部",
    position: "市场专员",
    salary: 14000,
    address: "深圳市南山区",
    email: "zhaoliu@example.com"
  },
  {
    id: 5,
    name: "钱七",
    age: 26,
    status: "在线",
    department: "运营部",
    position: "运营主管",
    salary: 17000,
    address: "杭州市西湖区",
    email: "qianqi@example.com"
  }
];
</script>

<style scoped>
.table-demo {
  width: 100%;
}
</style> 