<template>
  <div class="table-demo">
    <t-table :columns="columns" :data="tableData" :height="300" :fixedRow="handleFixedRow" :row-style="handleRowStyle" />
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
    name: "John",
    age: 25,
    status: "Online",
    address: "Chaoyang District, Beijing",
    important: true
  },
  {
    id: 2,
    name: "Mike",
    age: 30,
    status: "Offline",
    address: "Pudong New District, Shanghai"
  },
  {
    id: 3,
    name: "William",
    age: 28,
    status: "Online",
    address: "Tianhe District, Guangzhou",
    important: true
  },
  {
    id: 4,
    name: "James",
    age: 32,
    status: "Busy",
    address: "Nanshan District, Shenzhen"
  },
  {
    id: 5,
    name: "David",
    age: 26,
    status: "Online",
    address: "West Lake District, Hangzhou"
  },
  {
    id: 6,
    name: "Robert",
    age: 29,
    status: "Online",
    address: "Hongshan District, Wuhan",
    important: true
  },
  {
    id: 7,
    name: "Richard",
    age: 31,
    status: "Offline",
    address: "Gulou District, Nanjing"
  },
  {
    id: 8,
    name: "Joseph",
    age: 27,
    status: "Busy",
    address: "Wuhou District, Chengdu"
  },
  {
    id: 9,
    name: "Thomas",
    age: 33,
    status: "Online",
    address: "Yuzhong District, Chongqing",
    important: true
  },
  {
    id: 10,
    name: "Charles",
    age: 24,
    status: "Offline",
    address: "Yanta District, Xi'an"
  },
  {
    id: 11,
    name: "Daniel",
    age: 35,
    status: "Busy",
    address: "Heping District, Tianjin"
  },
  {
    id: 12,
    name: "Matthew",
    age: 28,
    status: "Online",
    address: "Siming District, Xiamen"
  },
  {
    id: 13,
    name: "Anthony",
    age: 29,
    status: "Offline",
    address: "Gusu District, Suzhou",
    important: true
  },
  {
    id: 14,
    name: "Mark",
    age: 26,
    status: "Online",
    address: "Shinan District, Qingdao"
  },
  {
    id: 15,
    name: "Donald",
    age: 31,
    status: "Busy",
    address: "Zhongshan District, Dalian"
  },
  {
    id: 16,
    name: "Steven",
    age: 34,
    status: "Online",
    address: "Haishu District, Ningbo",
    important: true
  },
  {
    id: 17,
    name: "Paul",
    age: 27,
    status: "Offline",
    address: "Lixia District, Jinan"
  },
  {
    id: 18,
    name: "Andrew",
    age: 30,
    status: "Online",
    address: "Gulou District, Fuzhou"
  },
  {
    id: 19,
    name: "Joshua",
    age: 25,
    status: "Busy",
    address: "Yuelu District, Changsha",
    important: true
  },
  {
    id: 20,
    name: "Kenneth",
    age: 32,
    status: "Online",
    address: "Baohe District, Hefei"
  }
];

// Determine if row should be fixed
const handleFixedRow = (index, row) => {
  return row.important === true;
};

// Set fixed row style
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
