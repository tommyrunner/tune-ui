<template>
  <div class="test-container">
    <h2>Table 表格组件</h2>

    <!-- 基础表格 -->
    <test-section title="基础表格">
      <div class="table-span">
        <t-table :columns="basicColumns" :data="basicData" :height="300" />
      </div>
    </test-section>

    <!-- 多级表头 -->
    <test-section title="多级表头">
      <div class="table-span">
        <t-table :columns="nestedColumns" :data="basicData" :height="300" />
      </div>
    </test-section>

    <!-- 虚拟列表 -->
    <test-section title="虚拟列表">
      <div class="table-span">
        <t-table :columns="basicColumns" :data="largeData" :height="500" isVirtualized />
      </div>
      <div class="control-panel">
        <div class="value-display">总数据: {{ largeData.length }} 条</div>
      </div>
    </test-section>

    <!-- 固定列 -->
    <test-section title="固定列">
      <div class="table-span">
        <t-table :columns="fixedColumns" :data="basicData" :height="300" border="#059669" />
      </div>
    </test-section>

    <!-- 固定行 -->
    <test-section title="固定行">
      <div class="table-span">
        <t-table
          :columns="basicColumns"
          :data="basicData"
          :height="300"
          :fixedRow="handleFixedRow"
          :row-style="handleRowFixedStyle"
        />
      </div>
    </test-section>

    <!-- 排序和筛选 -->
    <test-section title="排序和筛选">
      <div class="table-span">
        <t-table :columns="filterSortColumns" :data="basicData" :height="300" :sortMethod="handleSort" />
      </div>
    </test-section>

    <!-- 自定义渲染 -->
    <test-section title="自定义渲染">
      <div class="table-span">
        <t-table
          :columns="customRenderColumns"
          :data="basicData"
          :height="300"
          :rowStyle="handleRowStyle"
          :renderExtend="handleRenderExtend"
        />
      </div>
    </test-section>

    <!-- 选择和事件 -->
    <test-section title="选择和事件">
      <div class="table-span">
        <t-table
          :columns="basicColumns"
          :data="basicData"
          changeType="multiple"
          changeKey="_checked"
          @checked="handleChecked"
          @click-row="handleClickRow"
        />
      </div>
      <div class="event-log">
        <div class="event-title">事件记录:</div>
        <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
          {{ event }}
        </div>
      </div>
    </test-section>

    <!-- 样式配置 -->
    <test-section title="样式配置">
      <div class="table-span">
        <t-table
          :columns="basicColumns"
          :data="basicData"
          headBgColor="#f8fafc"
          hoverBgColor="#f3f4f6"
          border="1px solid #e5e7eb"
          :stripe="true"
          :dbClickAutoWidth="true"
        />
      </div>
    </test-section>

    <!-- 列合计 -->
    <test-section title="列合计">
      <div class="table-span">
        <t-table
          :columns="[
            { prop: 'id', label: 'ID', width: 80 },
            { prop: 'name', label: '名称', width: 120 },
            { prop: 'amount', label: '金额' }
          ]"
          :data="summaryData"
          :summary="value => `合计: ${value}`"
        />
      </div>
    </test-section>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import type { TableColumnsType, ColumnRenderScope, StateSortType } from "@/packages/table/table";
import { TTable } from "@/packages/table";
import TestSection from "../components/test-section.vue";
import { TButton } from "@/packages/button";
import { reactive } from "vue";

defineOptions({ name: "TableTest" });

// 基础列配置
const basicColumns = reactive<TableColumnsType[]>([
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "名称", width: 120 },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "status", label: "状态", width: 100 },
  { prop: "address", label: "地址" }
]);

// 多级表头配置
const nestedColumns = reactive<TableColumnsType[]>([
  { prop: "id", label: "ID", width: 80 },
  {
    prop: "userInfo",
    label: "用户信息",
    children: [
      { prop: "name", label: "名称" },
      { prop: "age", label: "年龄" },
      { prop: "status", label: "状态" }
    ],
    width: 280
  },
  {
    prop: "contactInfo",
    label: "联系方式",
    children: [
      { prop: "address", label: "地址" },
      { prop: "email", label: "邮箱" }
    ],
    width: 380
  },
  { prop: "id", label: "ID2" }
]);

// 固定列配置
const fixedColumns = reactive<TableColumnsType[]>([
  { prop: "id", label: "ID", width: 80, fixed: "left" },
  { prop: "name", label: "名称", width: 120 },
  { prop: "department", label: "部门", width: 120 },
  { prop: "position", label: "职位", width: 120 },
  { prop: "age", label: "年龄", width: 80 },
  { prop: "status", label: "状态", width: 100 },
  { prop: "salary", label: "薪资", width: 120 },
  { prop: "address", label: "地址", width: 640 },
  { prop: "email", label: "邮箱", width: 180, fixed: "right" }
]);

// 排序和筛选列配置
const filterSortColumns = reactive<TableColumnsType<BasicDataType>[]>([
  { prop: "id", label: "ID", width: 80, sortable: true },
  {
    prop: "name",
    label: "名称",
    width: 120,
    filters: [
      { label: "用户1", value: "用户1", type: "eq" },
      { label: "用户2", value: "用户2", type: "eq" }
    ]
  },
  { prop: "age", label: "年龄", width: 100, sortable: true },
  { prop: "address", label: "地址" }
]);

// 自定义渲染列配置
const customRenderColumns = reactive<TableColumnsType[]>([
  { prop: "id", label: "ID", width: 80 },
  {
    prop: "name",
    label: "名称",
    width: 120,
    render: (scope: ColumnRenderScope) => <span style="color: #2563eb; font-weight: 500;">{scope.value}</span>
  },
  {
    prop: "age",
    label: "年龄",
    width: 100,
    render: (scope: ColumnRenderScope) => (
      <TButton type={scope.value >= 18 ? "primary" : "warning"} size="small">
        {scope.value}岁
      </TButton>
    )
  },
  {
    prop: "status",
    label: "状态",
    width: 100,
    render: (scope: ColumnRenderScope) => (
      <TButton type={scope.data.status === "在线" ? "success" : "info"} size="small">
        {scope.data.status}
      </TButton>
    )
  },
  { prop: "address", label: "地址" }
]);

// 基础数据类型定义
interface BasicDataType {
  id: number;
  name: string;
  age: number;
  address: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  status: "在线" | "离线" | "忙碌";
  _checked?: boolean;
}

// 部门列表
const departments = ["研发部", "产品部", "设计部", "市场部", "运营部"];
const positions = ["工程师", "经理", "主管", "专员", "总监"];

// 基础数据
const basicData = ref<BasicDataType[]>(
  Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `用户${index + 1}`,
    age: Math.floor(Math.random() * 30 + 10),
    address: `深圳市南山区科技园${index + 1}号`,
    email: `user${index + 1}@example.com`,
    department: departments[Math.floor(Math.random() * departments.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    salary: Math.floor(Math.random() * 20000 + 10000),
    status: ["在线", "离线", "忙碌"][Math.floor(Math.random() * 3)] as BasicDataType["status"],
    _checked: false
  }))
);

// 大数据测试
const largeData = ref(
  Array.from({ length: 10000 }, (_, index) => ({
    id: index + 1,
    name: `用户${index + 1}`,
    age: Math.floor(Math.random() * 30 + 10),
    address: `深圳市南山区科技园${index + 1}号`,
    status: ["在线", "离线", "忙碌"][Math.floor(Math.random() * 3)]
  }))
);

// 事件日志
const eventLogs = ref<string[]>([]);

/**
 * 处理固定行
 */
const handleFixedRow = (_: number, row: BasicDataType) => {
  return row.status === "在线";
};

/**
 * 处理固定行样式
 */
const handleRowFixedStyle = (_: number, row: BasicDataType) => {
  return {
    border: row.status === "在线" ? "1px dashed #059669" : null
  };
};

/**
 * 处理排序
 */
const handleSort = (data: { rowA: BasicDataType; rowB: BasicDataType }, config: StateSortType[]) => {
  const [sortConfig] = config;
  if (!sortConfig) return 0;

  const { sort, prop } = sortConfig;
  const valA = data.rowA[prop];
  const valB = data.rowB[prop];

  if (sort === "asc") {
    return valA > valB ? 1 : -1;
  } else if (sort === "desc") {
    return valB > valA ? 1 : -1;
  }
  return 0;
};

/**
 * 处理行样式
 */
const handleRowStyle = (_: number, row: BasicDataType) => {
  return {
    color: row.status === "在线" ? "#059669" : "#6B7280"
  };
};

/**
 * 处理行扩展内容
 */
const handleRenderExtend = (row: BasicDataType) => {
  return <div style="padding: 16px">扩展内容: {JSON.stringify(row)}</div>;
};

/**
 * 处理选中事件
 */
const handleChecked = ({ row }: { row: BasicDataType }) => {
  eventLogs.value.unshift(`选中行: ${JSON.stringify(row)}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * 处理行点击事件
 */
const handleClickRow = (row: BasicDataType) => {
  eventLogs.value.unshift(`点击行: ${JSON.stringify(row)}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

// 合计数据类型定义
interface SummaryDataType {
  id: number;
  name: string;
  amount: number;
}

// 合计数据
const summaryData = ref<SummaryDataType[]>(
  Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `项目${index + 1}`,
    amount: Math.floor(Math.random() * 10000)
  }))
);
</script>

<style lang="scss" scoped>
.test-container {
  padding: 32px;
  width: 100%;
  min-width: 800px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
  }

  :deep(.test-section) {
    margin-bottom: 32px;

    .section-title {
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .table-span {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;

    :deep(.t-table) {
      width: 100%;
    }
  }

  .control-panel {
    margin-top: 16px;

    .value-display {
      padding: 8px 12px;
      background-color: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      color: #4b5563;
      font-size: 14px;
    }
  }

  .event-log {
    margin-top: 16px;
    padding: 16px;
    background-color: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 6px;

    .event-title {
      margin-bottom: 12px;
      font-weight: 600;
      color: #374151;
      font-size: 15px;
    }

    .event-item {
      padding: 6px 8px;
      margin-bottom: 4px;
      background-color: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-family: ui-monospace, monospace;
      font-size: 13px;
      color: #4b5563;
    }
  }
}
</style>
