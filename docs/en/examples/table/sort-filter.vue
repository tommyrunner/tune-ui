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

// Sort and filter column configuration
const filterSortColumns = [
  { prop: "id", label: "ID", width: 80, sortable: true },
  { 
    prop: "name", 
    label: "Name", 
    width: 120,
    filters: [
      { label: "John Smith", value: "John Smith", type: "eq" },
      { label: "Jane Doe", value: "Jane Doe", type: "eq" }
    ]
  },
  { prop: "age", label: "Age", width: 100, sortable: true },
  { 
    prop: "status", 
    label: "Status", 
    width: 100,
    filters: [
      { label: "Online", value: "Online", type: "eq" },
      { label: "Offline", value: "Offline", type: "eq" },
      { label: "Busy", value: "Busy", type: "eq" }
    ]
  },
  { prop: "address", label: "Address" }
];

// Table data
const tableData = [
  {
    id: 1,
    name: "John Smith",
    age: 25,
    status: "Online",
    address: "New York, NY"
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
    address: "Chicago, IL"
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
  }
];

// Custom sort method
const handleSort = ({ rowA, rowB }, sortConfig) => {
  // Get sort configuration
  const config = sortConfig[0];
  if (!config) return 0;
  
  const { prop, sort } = config;
  
  // Get comparison values
  const valueA = rowA[prop];
  const valueB = rowB[prop];
  
  // Return comparison result based on sort direction
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