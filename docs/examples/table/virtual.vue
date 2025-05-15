<template>
  <div class="table-demo">
    <t-table 
      :columns="columns" 
      :data="largeData" 
      :height="400" 
      isVirtualized 
    />
    <div class="control-panel">
      <div class="data-info">总数据量: {{ largeData.length }} 条</div>
    </div>
  </div>
</template>

<script setup>
import { TTable } from "tune-ui";

// 列配置
const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "名称", width: 120 },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "status", label: "状态", width: 100 },
  { prop: "department", label: "部门", width: 120 },
  { prop: "position", label: "职位", width: 120 },
  { prop: "address", label: "地址" }
];

// 生成大量数据用于虚拟滚动测试
const generateData = (count) => {
  const departments = ["研发部", "产品部", "设计部", "市场部", "运营部"];
  const positions = ["工程师", "经理", "主管", "专员", "总监"];
  const statuses = ["在线", "离线", "忙碌"];
  
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `用户${index + 1}`,
    age: Math.floor(Math.random() * 30) + 20,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    address: `城市${Math.floor(index / 100) + 1}区${Math.floor(index / 10) % 10 + 1}街道${index % 10 + 1}号`
  }));
};

// 大数据量
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