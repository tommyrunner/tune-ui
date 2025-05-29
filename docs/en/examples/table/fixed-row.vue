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
    name: "John Smith",
    age: 25,
    status: "Online",
    address: "New York, NY",
    important: true
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 30,
    status: "Offline",
    address: "Los Angeles, CA"
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 28,
    status: "Online",
    address: "Chicago, IL",
    important: true
  },
  {
    id: 4,
    name: "Alice Brown",
    age: 32,
    status: "Busy",
    address: "Houston, TX"
  },
  {
    id: 5,
    name: "Charlie Wilson",
    age: 26,
    status: "Online",
    address: "Phoenix, AZ"
  },
  {
    id: 6,
    name: "David Miller",
    age: 29,
    status: "Online",
    address: "Philadelphia, PA",
    important: true
  },
  {
    id: 7,
    name: "Emma Davis",
    age: 31,
    status: "Offline",
    address: "San Antonio, TX"
  },
  {
    id: 8,
    name: "Frank Garcia",
    age: 27,
    status: "Busy",
    address: "San Diego, CA"
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
