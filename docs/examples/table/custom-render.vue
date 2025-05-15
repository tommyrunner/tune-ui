<template>
  <div class="table-demo">
    <t-table :columns="customColumns" :data="tableData" :height="300" />
  </div>
</template>

<script lang="tsx" setup>
import { h } from "vue";
import { TTable } from "tune-ui";
import { TButton } from "tune-ui";

// 自定义渲染列配置
const customColumns = [
  { prop: "id", label: "ID", width: 80 },
  {
    prop: "name",
    label: "名称",
    width: 120,
    render: ({ value }) => h("span", { style: { color: "#2563eb", fontWeight: "500" } }, value)
  },
  {
    prop: "age",
    label: "年龄",
    width: 100,
    render: ({ data }) =>
      h(
        TButton,
        {
          type: data.age >= 30 ? "primary" : "info",
          size: "small"
        },
        {
          default: () => data.age + "岁"
        }
      )
  },
  {
    prop: "status",
    label: "状态",
    width: 100,
    render: ({ data }) => {
      const statusMap = {
        "在线": { color: "#10b981", text: "在线" },
        "离线": { color: "#6b7280", text: "离线" },
        "忙碌": { color: "#f59e0b", text: "忙碌" }
      };
      const status = statusMap[data.status] || { color: "#6b7280", text: data.status };
      
      return h("div", { 
        style: {
          padding: "2px 8px",
          backgroundColor: `${status.color}20`,
          color: status.color,
          borderRadius: "4px",
          display: "inline-block",
          fontSize: "12px"
        }
      }, status.text);
    }
  },
  {
    prop: "address",
    label: "地址",
    renderHead: () => h("span", { style: { color: "#059669" } }, "详细地址")
  },
  {
    prop: "actions",
    label: "操作",
    width: 140,
    render: ({ data }) => h("div", { style: { display: "flex", gap: "8px" } }, [
      h(
        TButton,
        {
          type: "primary",
          size: "small"
        },
        {
          default: () => "编辑"
        }
      ),
      h(
        TButton,
        {
          type: "danger",
          size: "small"
        },
        {
          default: () => "删除"
        }
      )
    ])
  }
];

// 表格数据
const tableData = [
  {
    id: 1,
    name: "张三",
    age: 25,
    status: "在线",
    address: "北京市朝阳区"
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
</script>

<style scoped>
.table-demo {
  width: 100%;
}
</style> 