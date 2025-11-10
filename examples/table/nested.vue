<template>
  <div class="table-demo">
    <t-table :columns="nestedColumns" :data="tableData" :height="300" />
  </div>
</template>

<script setup>


// 多级表头配置
const nestedColumns = [
  { prop: "id", label: "ID", width: 80 },
  {
    prop: "userInfo",
    label: "用户信息",
    children: [
      { prop: "name", label: "姓名", width: 100 },
      { prop: "age", label: "年龄", width: 80 },
      { prop: "status", label: "状态", width: 100 }
    ]
  },
  {
    prop: "contactInfo",
    label: "联系方式",
    children: [
      { prop: "address", label: "地址" },
      { prop: "email", label: "邮箱", width: 160 }
    ]
  }
];

// 表格数据
const tableData = [
  {
    id: 1,
    name: "张三",
    age: 25,
    status: "在线",
    address: "北京市朝阳区",
    email: "zhangsan@example.com"
  },
  {
    id: 2,
    name: "李四",
    age: 30,
    status: "离线",
    address: "上海市浦东新区",
    email: "lisi@example.com"
  },
  {
    id: 3,
    name: "王五",
    age: 28,
    status: "在线",
    address: "广州市天河区",
    email: "wangwu@example.com"
  },
  {
    id: 4,
    name: "赵六",
    age: 32,
    status: "忙碌",
    address: "深圳市南山区",
    email: "zhaoliu@example.com"
  },
  {
    id: 5,
    name: "钱七",
    age: 26,
    status: "在线",
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