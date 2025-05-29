<template>
  <div class="tree-demo">
    <div class="demo-row">
      <div class="label">Individual Node Disabled:</div>
      <t-tree :data="treeData1" checkable></t-tree>
    </div>

    <div class="demo-row">
      <div class="label">Entire Tree Disabled:</div>
      <t-tree :data="treeData2" checkable disabled></t-tree>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Partial nodes disabled
const treeData1 = ref([
  {
    id: "1",
    label: "Level 1 Node 1",
    children: [
      {
        id: "1-1",
        label: "Level 2 Node 1-1",
        disabled: true, // Disable this node
        children: [
          {
            id: "1-1-1",
            label: "Level 3 Node 1-1-1"
          }
        ]
      },
      {
        id: "1-2",
        label: "Level 2 Node 1-2"
      }
    ]
  },
  {
    id: "2",
    label: "Level 1 Node 2",
    children: [
      {
        id: "2-1",
        label: "Level 2 Node 2-1",
        disabled: true // Disable this node
      },
      {
        id: "2-2",
        label: "Level 2 Node 2-2"
      }
    ]
  }
]);

// Normal data for overall disable demonstration
const treeData2 = ref([
  {
    id: "1",
    label: "Level 1 Node 1",
    children: [
      {
        id: "1-1",
        label: "Level 2 Node 1-1",
        children: [
          {
            id: "1-1-1",
            label: "Level 3 Node 1-1-1"
          }
        ]
      },
      {
        id: "1-2",
        label: "Level 2 Node 1-2"
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
