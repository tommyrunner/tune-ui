<template>
  <div class="table-demo">
    <t-table :columns="columns" :data="summaryData" :height="300" :summary="handleSummary" />
  </div>
</template>

<script setup>
import { reactive } from "vue";

// Column configuration
const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "Project Name", width: 150 },
  { prop: "date", label: "Date", width: 120 },
  { prop: "amount", label: "Amount", width: 120 },
  { prop: "status", label: "Status" }
];

// Table data
const summaryData = reactive([
  {
    id: 1,
    name: "Project A",
    date: "2023-01-15",
    amount: 12500,
    status: "Completed"
  },
  {
    id: 2,
    name: "Project B",
    date: "2023-02-20",
    amount: 8300,
    status: "In Progress"
  },
  {
    id: 3,
    name: "Project C",
    date: "2023-03-10",
    amount: 15600,
    status: "Completed"
  },
  {
    id: 4,
    name: "Project D",
    date: "2023-04-05",
    amount: 6200,
    status: "Not Started"
  },
  {
    id: 5,
    name: "Project E",
    date: "2023-05-12",
    amount: 9800,
    status: "In Progress"
  }
]);

/**
 * Handle summary row
 * @param {Number} value - Column summary value
 * @param {Object} scope - Column context
 * @returns {String} Summary text
 */
const handleSummary = (value, scope) => {
  const prop = scope.rowCol.prop;

  // Display different summary content based on different columns
  if (prop === "id") {
    return "Total";
  } else if (prop === "amount") {
    return `$ ${value.toLocaleString()}`;
  } else if (prop === "name") {
    return `${summaryData.length} Projects`;
  } else if (prop === "status") {
    const completed = summaryData.filter(item => item.status === "Completed").length;
    return `Completion Rate: ${Math.round((completed / summaryData.length) * 100)}%`;
  }

  return "";
};
</script>

<style scoped>
.table-demo {
  width: 100%;
}
</style>
