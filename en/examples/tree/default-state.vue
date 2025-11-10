<template>
  <div class="tree-demo">
    <t-tree :data="treeData" checkable :expanded="defaultExpanded" :checked="defaultChecked"></t-tree>

    <div class="description">
      Default expanded nodes: Level 1 Node 1, Level 2 Node 1-1<br />
      Default selected nodes: Level 3 Node 1-1-2, Level 2 Node 2-1
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
        label: "Level 2 Node 1-1",
        children: [
          {
            id: "1-1-1",
            label: "Level 3 Node 1-1-1"
          },
          {
            id: "1-1-2",
            label: "Level 3 Node 1-1-2"
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

// Default expanded nodes
const defaultExpanded = ref(["1", "1-1"]);

// Default selected nodes
const defaultChecked = ref(["1-1-2", "2-1"]);
</script>

<style scoped>
.tree-demo {
  padding: 16px 0;
  max-width: 400px;
}
.description {
  margin-top: 20px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}
</style>
