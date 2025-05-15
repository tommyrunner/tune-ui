<template>
  <div class="tree-demo">
    <div class="demo-row">
      <div class="label">普通模式:</div>
      <t-tree :data="treeData"></t-tree>
    </div>

    <div class="demo-row">
      <div class="label">手风琴模式:</div>
      <t-tree :data="treeData" accordion></t-tree>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TTree } from "tune-ui";

const treeData = ref([
  {
    id: "1",
    label: "一级节点 1",
    children: [
      {
        id: "1-1",
        label: "二级节点 1-1"
      },
      {
        id: "1-2",
        label: "二级节点 1-2"
      },
      {
        id: "1-3",
        label: "二级节点 1-3"
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
  },
  {
    id: "3",
    label: "一级节点 3",
    children: [
      {
        id: "3-1",
        label: "二级节点 3-1"
      },
      {
        id: "3-2",
        label: "二级节点 3-2"
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
  width: 100px;
  font-weight: bold;
  padding-top: 8px;
  color: #606266;
}
</style>
