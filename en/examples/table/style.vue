<template>
  <div class="table-demo">
    <div class="style-options">
      <div class="option-item">
        <span class="option-label">Header Background:</span>
        <t-color-picker v-model="headBgColor" size="small" />
      </div>
      <div class="option-item">
        <span class="option-label">Footer Background:</span>
        <t-color-picker v-model="footBgColor" size="small" />
      </div>
      <div class="option-item">
        <span class="option-label">Hover Background:</span>
        <t-color-picker v-model="hoverBgColor" size="small" />
      </div>
      <div class="option-item">
        <span class="option-label">Border Color:</span>
        <t-color-picker v-model="borderColor" size="small" />
      </div>
      <div class="option-item">
        <span class="option-label">Stripe:</span>
        <t-switch v-model="stripe" size="small" />
      </div>
    </div>
    <t-table
      :columns="columns"
      :data="tableData"
      :headBgColor="headBgColor"
      :footBgColor="footBgColor"
      :hoverBgColor="hoverBgColor"
      :border="borderColor"
      :stripe="stripe"
      :dbClickAutoWidth="true"
      summary
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

// Style configuration
const headBgColor = ref("#f8fafc");
const footBgColor = ref("#f8fafc");
const hoverBgColor = ref("#f3f4f6");
const borderColor = ref("#e5e7eb");
const stripe = ref(true);

// Column configuration
const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "Name", width: 120 },
  { prop: "age", label: "Age", width: 100 },
  { prop: "status", label: "Status", width: 100 },
  { prop: "department", label: "Department", width: 120 },
  { prop: "address", label: "Address" }
];

// Table data
const tableData = [
  {
    id: 1,
    name: "John Smith",
    age: 25,
    status: "Online",
    department: "Development",
    address: "New York, NY"
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 30,
    status: "Offline",
    department: "Product",
    address: "Los Angeles, CA"
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 28,
    status: "Online",
    department: "Design",
    address: "Chicago, IL"
  },
  {
    id: 4,
    name: "Alice Brown",
    age: 32,
    status: "Busy",
    department: "Marketing",
    address: "Houston, TX"
  },
  {
    id: 5,
    name: "Charlie Wilson",
    age: 26,
    status: "Online",
    department: "Operations",
    address: "Phoenix, AZ"
  }
];
</script>

<style scoped>
.table-demo {
  width: 100%;
}

.style-options {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  gap: 16px;
}

.option-item {
  display: flex;
  align-items: center;
}

.option-label {
  margin-right: 8px;
  font-size: 14px;
  color: #4b5563;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
}
</style>
