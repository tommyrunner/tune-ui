<template>
  <div class="table-demo">
    <t-table :columns="fixedColumns" :data="tableData" :height="300" />
  </div>
</template>

<script setup>
// Fixed column configuration
const fixedColumns = [
  { prop: "id", label: "ID", width: 80, fixed: "left" },
  { prop: "name", label: "Name", width: 120 },
  { prop: "department", label: "Department", width: 120 },
  { prop: "position", label: "Position", width: 120 },
  { prop: "age", label: "Age", width: 80 },
  { prop: "status", label: "Status", width: 100 },
  { prop: "salary", label: "Salary", width: 100 },
  { prop: "address", label: "Address", width: 200 },
  { prop: "email", label: "Email", width: 180, fixed: "right" }
];

// Table data
const tableData = [
  {
    id: 1,
    name: "John Smith",
    age: 25,
    status: "Online",
    department: "Development",
    position: "Frontend Engineer",
    salary: 15000,
    address: "New York, NY",
    email: "john.smith@example.com"
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 30,
    status: "Offline",
    department: "Product",
    position: "Product Manager",
    salary: 18000,
    address: "Los Angeles, CA",
    email: "jane.doe@example.com"
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 28,
    status: "Online",
    department: "Design",
    position: "UI Designer",
    salary: 16000,
    address: "Chicago, IL",
    email: "bob.johnson@example.com"
  },
  {
    id: 4,
    name: "Alice Brown",
    age: 32,
    status: "Busy",
    department: "Marketing",
    position: "Marketing Specialist",
    salary: 14000,
    address: "Houston, TX",
    email: "alice.brown@example.com"
  },
  {
    id: 5,
    name: "Charlie Wilson",
    age: 26,
    status: "Online",
    department: "Operations",
    position: "Operations Manager",
    salary: 17000,
    address: "Phoenix, AZ",
    email: "charlie.wilson@example.com"
  }
];
</script>

<style scoped>
.table-demo {
  width: 100%;
}
</style>
