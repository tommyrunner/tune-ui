<template>
  <div class="table-demo">
    <t-table 
      :columns="columns" 
      :data="largeData" 
      :height="400" 
      isVirtualized 
    />
    <div class="control-panel">
      <div class="data-info">Total Data Count: {{ largeData.length }} records</div>
    </div>
  </div>
</template>

<script setup>

// Column configuration
const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "Name", width: 120 },
  { prop: "age", label: "Age", width: 100 },
  { prop: "status", label: "Status", width: 100 },
  { prop: "department", label: "Department", width: 120 },
  { prop: "position", label: "Position", width: 120 },
  { prop: "address", label: "Address" }
];

// Generate large amount of data for virtual scrolling test
const generateData = (count) => {
  const departments = ["Development", "Product", "Design", "Marketing", "Operations"];
  const positions = ["Engineer", "Manager", "Supervisor", "Specialist", "Director"];
  const statuses = ["Online", "Offline", "Busy"];
  
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    age: Math.floor(Math.random() * 30) + 20,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    address: `City ${Math.floor(index / 100) + 1} District ${Math.floor(index / 10) % 10 + 1} Street ${index % 10 + 1}`
  }));
};

// Large dataset
const largeData = generateData(5000);
</script>

<style scoped>
.table-demo {
  width: 100%;
}

.control-panel {
  margin-top: 16px;
  padding: 12px 16px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.data-info {
  font-weight: 500;
  color: #374151;
}
</style> 