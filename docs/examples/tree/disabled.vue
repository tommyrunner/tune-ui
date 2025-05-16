<template>
  <div class="tree-demo">
    <div class="demo-row">
      <div class="label">单个节点禁用:</div>
      <t-tree :data="treeData1" checkable></t-tree>
    </div>

    <div class="demo-row">
      <div class="label">整棵树禁用:</div>
      <t-tree :data="treeData2" checkable disabled></t-tree>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TTree } from "tune-ui";

// 部分节点禁用
const treeData1 = ref([
  {
    id: "1",
    label: "一级节点 1",
    children: [
      {
        id: "1-1",
        label: "二级节点 1-1",
        disabled: true, // 禁用该节点
        children: [
          {
            id: "1-1-1",
            label: "三级节点 1-1-1"
          }
        ]
      },
      {
        id: "1-2",
        label: "二级节点 1-2"
      }
    ]
  },
  {
    id: "2",
    label: "一级节点 2",
    children: [
      {
        id: "2-1",
        label: "二级节点 2-1",
        disabled: true // 禁用该节点
      },
      {
        id: "2-2",
        label: "二级节点 2-2"
      }
    ]
  }
]);

// 正常数据用于整体禁用演示
const treeData2 = ref([
  {
    id: "1",
    label: "一级节点 1",
    children: [
      {
        id: "1-1",
        label: "二级节点 1-1",
        children: [
          {
            id: "1-1-1",
            label: "三级节点 1-1-1"
          }
        ]
      },
      {
        id: "1-2",
        label: "二级节点 1-2"
      }
    ]
  },
  {
    id: "2",
    label: "一级节点 2",
    children: [
      {
        id: "2-1",
        label: "二级节点 2-1"
      },
      {
        id: "2-2",
        label: "二级节点 2-2"
      }
    ]
  }
]);
</script>

<style scoped>
.tree-demo {
  padding: 16px 0;
}
.demo-row {
  display: flex;
  margin-bottom: 32px;
}
.label {
  width: 120px;
  font-weight: bold;
  padding-top: 8px;
  color: #606266;
}
</style>
