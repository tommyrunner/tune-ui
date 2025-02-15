<template>
  <div class="test-container">
    <h2>Table 表格组件</h2>

    <!-- 基础表格 -->
    <test-section title="基础表格">
      <div class="table-row">
        <t-table :columns="basicColumns" :data="basicData" :height="300" />
      </div>
    </test-section>

    <!-- 虚拟列表 -->
    <test-section title="虚拟列表">
      <div class="table-row">
        <t-table :columns="basicColumns" :data="largeData" :height="300" :isVirtualized="true" />
      </div>
      <div class="control-panel">
        <div class="value-display">总数据: {{ largeData.length }} 条</div>
      </div>
    </test-section>

    <!-- 固定列 -->
    <test-section title="固定列">
      <div class="table-row">
        <t-table :columns="fixedColumns" :data="basicData" :height="300" />
      </div>
    </test-section>
    <!-- 固定行 -->
    <test-section title="固定行">
      <div class="table-row">
        <t-table :columns="fixedColumns" :data="basicData" :height="200" :fixedIndexRow="1" />
      </div>
    </test-section>

    <!-- 表头配置 -->
    <test-section title="表头配置">
      <div class="table-row">
        <t-table
          :columns="basicColumns"
          :data="basicData"
          headBgColor="#f8fafc"
          hoverBgColor="#f3f4f6"
          fixedRowBgColor="#ebf5ff"
        />
      </div>
    </test-section>

    <!-- 边框和斑马纹 -->
    <test-section title="边框和斑马纹">
      <div class="table-row">
        <t-table :columns="basicColumns" :data="basicData" border="1px solid #e5e7eb" stripe="#f9fafb" />
      </div>
    </test-section>

    <!-- 列合计 -->
    <test-section title="列合计">
      <div class="table-row">
        <t-table :columns="summaryColumns" :data="summaryData" :summary="handleSummary" />
      </div>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <div class="table-row">
        <t-table :columns="basicColumns" :data="basicData" @checked="handleChecked" @click-row="handleClickRow" />
      </div>
      <div class="event-log">
        <div class="event-title">事件记录:</div>
        <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
          {{ event }}
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TableColumnsType, ColumnRenderScope } from "@/packages/table/table";
import { TTable } from "@/packages/table";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "TableTest" });

// 基础列配置
const basicColumns: TableColumnsType[] = [
  { prop: "id", label: "ID", width: 100 },
  { prop: "name", label: "名称", width: 160 },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "address", label: "地址" }
];

// 固定列配置
const fixedColumns: TableColumnsType[] = [
  { prop: "id", label: "ID", width: 100 },
  { prop: "name", label: "名称", width: 160 },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "address", label: "地址", width: 300 },
  { prop: "web", label: "网址", width: 160 },
  { prop: "email", label: "邮箱", width: 220 }
];

// 合计列配置
const summaryColumns: TableColumnsType[] = [
  { prop: "id", label: "ID", width: 100 },
  { prop: "name", label: "名称", width: 200 },
  { prop: "amount", label: "金额", width: 160 }
];

// 基础数据
const basicData = ref(
  Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `用户${index + 1}`,
    age: Math.floor(Math.random() * 30 + 18),
    address: `地址${index + 1}`,
    web: `https://www.baidu.com`,
    email: `user${index + 1}@example.com`
  }))
);

// 大数据测试
const largeData = ref(
  Array.from({ length: 10000 }, (_, index) => ({
    id: index + 1,
    name: `用户${index + 1}`,
    age: Math.floor(Math.random() * 30 + 18),
    address: `地址${index + 1}`
  }))
);

// 合计数据
const summaryData = ref(
  Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `项目${index + 1}`,
    amount: Math.floor(Math.random() * 1000 + 100)
  }))
);

// 事件日志
const eventLogs = ref<string[]>([]);

/**
 * 处理合计
 */
const handleSummary = (value: number, scope: ColumnRenderScope) => {
  if (scope.rowCol.prop === "amount") {
    return `合计: ${value}`;
  }
  return "";
};

/**
 * 处理选中事件
 */
const handleChecked = ({ row, data }: { row: any; data: any[] }) => {
  eventLogs.value.unshift(`选中行: ${JSON.stringify(row)}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * 处理行点击事件
 */
const handleClickRow = (row: any) => {
  eventLogs.value.unshift(`点击行: ${JSON.stringify(row)}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 32px;
  width: 100%;
  min-width: 800px;
  background-color: #fff;
  border-radius: 8px;

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

  .table-row {
    width: 100%;
    padding: 16px;
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
