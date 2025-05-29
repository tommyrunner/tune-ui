<template>
  <div class="table-demo">
    <t-table
      :columns="columns"
      :data="tableData"
      changeType="multiple"
      changeKey="_checked"
      @checked="handleChecked"
      @click-row="handleClickRow"
    />
    <div class="event-log">
      <div class="event-title">Event Log:</div>
      <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
        {{ event }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
    _checked: true
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

// Event logs
const eventLogs = ref(["Initialization: Selected John Smith"]);

// Handle checked event
const handleChecked = ({ row }) => {
  const action = row._checked ? "Selected" : "Deselected";
  const message = `${action} ${row.name}`;
  eventLogs.value.unshift(message);

  // Keep maximum 5 records
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

// Handle row click event
const handleClickRow = row => {
  const message = `Clicked row ${row.name}`;
  eventLogs.value.unshift(message);

  // Keep maximum 5 records
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};
</script>

<style scoped>
.table-demo {
  width: 100%;
}

.event-log {
  margin-top: 16px;
  padding: 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.event-title {
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
}

.event-item {
  padding: 6px 10px;
  margin-bottom: 4px;
  background-color: #f3f4f6;
  border-radius: 4px;
  font-size: 14px;
}
</style> 