<template>
  <div class="table-demo">
    <t-table :columns="nestedColumns" :data="tableData" :height="300" />
  </div>
</template>

<script setup>

// Multi-level header configuration
const nestedColumns = [
  { prop: "id", label: "ID", width: 80 },
  {
    prop: "userInfo",
    label: "User Information",
    children: [
      { prop: "name", label: "Name", width: 100 },
      { prop: "age", label: "Age", width: 80 },
      { prop: "status", label: "Status", width: 100 }
    ]
  },
  {
    prop: "contactInfo",
    label: "Contact Information",
    children: [
      { prop: "address", label: "Address" },
      { prop: "email", label: "Email", width: 160 }
    ]
  }
];

// Table data
const tableData = [
  {
    id: 1,
    name: "John Smith",
    age: 25,
    status: "Online",
    address: "New York, NY",
    email: "john.smith@example.com"
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 30,
    status: "Offline",
    address: "Los Angeles, CA",
    email: "jane.doe@example.com"
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 28,
    status: "Online",
    address: "Chicago, IL",
    email: "bob.johnson@example.com"
  },
  {
    id: 4,
    name: "Alice Brown",
    age: 32,
    status: "Busy",
    address: "Houston, TX",
    email: "alice.brown@example.com"
  },
  {
    id: 5,
    name: "Charlie Wilson",
    age: 26,
    status: "Online",
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