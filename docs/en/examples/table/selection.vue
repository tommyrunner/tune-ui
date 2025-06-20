<template>
  <div class="table-demo">
    <t-radio-group v-model="changeType" @change="handleChangeType">
      <t-radio value="multiple">Multiple</t-radio>
      <t-radio value="single">Single</t-radio>
      <t-radio value="none">None</t-radio>
    </t-radio-group>
    <br />
    <t-table
      :columns="columns"
      :data="tableData"
      :changeType="changeType"
      changeKey="_checked"
      @checked="handleChecked"
      @checked-all="handleCheckedAll"
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
import { ref, reactive } from "vue";
const changeType = ref("multiple");

// Column configuration
const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "Name", width: 120 },
  { prop: "age", label: "Age", width: 100 },
  { prop: "status", label: "Status", width: 100 },
  { prop: "address", label: "Address" }
];

// Table data
const tableData = reactive([
  {
    id: 1,
    name: "Zhang San",
    age: 25,
    status: "Online",
    address: "Chaoyang District, Beijing"
  },
  {
    id: 2,
    name: "Li Si",
    age: 30,
    status: "Offline",
    address: "Pudong New District, Shanghai"
  },
  {
    id: 3,
    name: "Wang Wu",
    age: 28,
    status: "Online",
    address: "Tianhe District, Guangzhou"
  },
  {
    id: 4,
    name: "Zhao Liu",
    age: 32,
    status: "Busy",
    address: "Nanshan District, Shenzhen"
  },
  {
    id: 5,
    name: "Qian Qi",
    age: 26,
    status: "Online",
    address: "West Lake District, Hangzhou"
  }
]);

// Event logs
const eventLogs = ref([]);

/**
 * Handle selection event
 * @param {Object} param0 - Event parameters
 * @param {Array} param0.row - Selected row data
 */
const handleChecked = ({ row }) => {
  const action = row[0].data._checked ? "Selected" : "Unselected";
  const message = `${action} ${row[0].data.name}`;
  eventLogs.value.unshift(message);

  // Keep maximum 5 records
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * Handle selection type change
 * @param {string} value - New selection type
 */
const handleChangeType = value => {
  changeType.value = value;
};

/**
 * Handle select all event
 * @param {Object} param0 - Event parameters
 * @param {boolean} param0._checked - Whether all rows are selected
 */
const handleCheckedAll = ({ _checked }) => {
  eventLogs.value.unshift(`Select All: ${_checked ? "Selected" : "Canceled"}`);
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
