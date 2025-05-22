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
      <div class="event-title">事件记录:</div>
      <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
        {{ event }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// 列配置
const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "名称", width: 120 },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "status", label: "状态", width: 100 },
  { prop: "address", label: "地址" }
];

// 表格数据
const tableData = [
  {
    id: 1,
    name: "张三",
    age: 25,
    status: "在线",
    address: "北京市朝阳区",
    _checked: true
  },
  {
    id: 2,
    name: "李四",
    age: 30,
    status: "离线",
    address: "上海市浦东新区"
  },
  {
    id: 3,
    name: "王五",
    age: 28,
    status: "在线",
    address: "广州市天河区"
  },
  {
    id: 4,
    name: "赵六",
    age: 32,
    status: "忙碌",
    address: "深圳市南山区"
  },
  {
    id: 5,
    name: "钱七",
    age: 26,
    status: "在线",
    address: "杭州市西湖区"
  }
];

// 事件记录
const eventLogs = ref([
  "初始化：选中 张三"
]);

// 处理选中事件
const handleChecked = ({ row, data }) => {
  const action = row._checked ? "选中" : "取消选中";
  const message = `${action} ${row.name}`;
  eventLogs.value.unshift(message);
  
  // 保持最多显示5条记录
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

// 处理行点击事件
const handleClickRow = (row) => {
  const message = `点击行 ${row.name}`;
  eventLogs.value.unshift(message);
  
  // 保持最多显示5条记录
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