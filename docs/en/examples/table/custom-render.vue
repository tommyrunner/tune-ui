<template>
  <div class="table-demo">
    <t-table :columns="customColumns" :data="tableData" :height="300" />
  </div>
</template>

<script lang="tsx" setup>
import { h } from "vue";

// Custom render column configuration
const customColumns = [
  { prop: "id", label: "ID", width: 80 },
  {
    prop: "name",
    label: "Name",
    width: 120,
    render: ({ value }) => h("span", { style: { color: "#2563eb", fontWeight: "500" } }, value)
  },
  {
    prop: "age",
    label: "Age",
    width: 100,
    render: ({ data }) =>
      h(
        "t-button",
        {
          type: data.age >= 30 ? "primary" : "info",
          size: "small"
        },
        {
          default: () => data.age + " years"
        }
      )
  },
  {
    prop: "status",
    label: "Status",
    width: 100,
    render: ({ data }) => {
      const statusMap = {
        online: { color: "#10b981", text: "Online" },
        offline: { color: "#6b7280", text: "Offline" },
        busy: { color: "#f59e0b", text: "Busy" }
      };
      const status = statusMap[data.status] || { color: "#6b7280", text: data.status };

      return h(
        "div",
        {
          style: {
            padding: "2px 8px",
            backgroundColor: `${status.color}20`,
            color: status.color,
            borderRadius: "4px",
            display: "inline-block",
            fontSize: "12px"
          }
        },
        status.text
      );
    }
  },
  {
    prop: "address",
    label: "Address",
    renderHead: () => h("span", { style: { color: "#059669" } }, "Detailed Address")
  },
  {
    prop: "actions",
    label: "Actions",
    width: 140,
    render: ({ data }) =>
      h("div", { style: { display: "flex", gap: "8px" } }, [
        h(
          "t-button",
          {
            type: "primary",
            size: "small"
          },
          {
            default: () => "Edit"
          }
        ),
        h(
          "t-button",
          {
            type: "danger",
            size: "small"
          },
          {
            default: () => "Delete"
          }
        )
      ])
  }
];

// Table data
const tableData = [
  {
    id: 1,
    name: "John Smith",
    age: 25,
    status: "online",
    address: "New York, NY"
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 30,
    status: "offline",
    address: "Los Angeles, CA"
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 28,
    status: "online",
    address: "Chicago, IL"
  },
  {
    id: 4,
    name: "Alice Brown",
    age: 32,
    status: "busy",
    address: "Houston, TX"
  },
  {
    id: 5,
    name: "Charlie Wilson",
    age: 26,
    status: "online",
    address: "Phoenix, AZ"
  }
];
</script>

<style scoped>
.table-demo {
  width: 100%;
}
</style>
