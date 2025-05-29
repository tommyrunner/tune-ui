<template>
  <div class="tree-demo">
    <div class="demo-row">
      <div class="label">Normal Mode:</div>
      <t-tree :data="treeData"></t-tree>
    </div>

    <div class="demo-row">
      <div class="label">Accordion Mode:</div>
      <t-tree :data="treeData" accordion></t-tree>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const treeData = ref([
  {
    id: "1",
    label: "Level 1 Node 1",
    children: [
      {
        id: "1-1",
        label: "Level 2 Node 1-1"
      },
      {
        id: "1-2",
        label: "Level 2 Node 1-2"
      },
      {
        id: "1-3",
        label: "Level 2 Node 1-3"
      }
    ]
  },
  {
    id: "2",
    label: "Level 1 Node 2",
    children: [
      {
        id: "2-1",
        label: "Level 2 Node 2-1"
      },
      {
        id: "2-2",
        label: "Level 2 Node 2-2"
      }
    ]
  },
  {
    id: "3",
    label: "Level 1 Node 3",
    children: [
      {
        id: "3-1",
        label: "Level 2 Node 3-1"
      },
      {
        id: "3-2",
        label: "Level 2 Node 3-2"
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
