<template>
  <div class="table-demo">
    <t-table :columns="columns" :data="tableData" :height="300" />
  </div>
</template>

<script setup>

// Column configuration
const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "Name", width: 120 },
  { prop: "age", label: "Age", width: 100 },
  { prop: "status", label: "Status", width: 100 },
  { prop: "address", label: "Address" }
];

// Table data
const tableData = [
  {
    id: 1,
    name: "Zhang San",
    age: 25,
    status: "Online",
    address: "Chaoyang District, Beijing"
  },
  {
    id: 2,
    name: "Li Si",
    age: 30,
    status: "Offline",
    address: "Pudong New Area, Shanghai"
  },
  {
    id: 3,
    name: "Wang Wu",
    age: 28,
    status: "Online",
    address: "Tianhe District, Guangzhou"
  },
  {
    id: 4,
    name: "Zhao Liu",
    age: 32,
    status: "Busy",
    address: "Nanshan District, Shenzhen"
  },
  {
    id: 5,
    name: "Qian Qi",
    age: 26,
    status: "Online",
    address: "Xihu District, Hangzhou"
  }
];
</script>

<style scoped>
.table-demo {
  width: 100%;
}
</style>
