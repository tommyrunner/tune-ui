<template>
  <div class="tree-demo">
    <div class="demo-row">
      <div class="label">Click Node to Expand/Collapse:</div>
      <t-tree :data="treeData" :expand-on-click-node="true"></t-tree>
    </div>

    <div class="demo-row">
      <div class="label">Click Arrow Only to Expand/Collapse:</div>
      <t-tree :data="treeData" :expand-on-click-node="false"></t-tree>
    </div>

    <div class="description">
      <p>You can control the expand/collapse behavior by setting the <code>expand-on-click-node</code> property:</p>
      <ul>
        <li><code>true</code>: Expand/collapse when clicking on the node (default behavior)</li>
        <li><code>false</code>: Only expand/collapse by clicking the arrow icon</li>
      </ul>
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
</script>

<style scoped>
.tree-demo {
  padding: 16px 0;
}
.demo-row {
  display: flex;
  margin-bottom: 24px;
}
.label {
  width: 160px;
  font-weight: bold;
  padding-top: 8px;
  color: #606266;
}
.description {
  margin-top: 16px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
}
.description code {
  background-color: #e6f7ff;
  padding: 2px 4px;
  border-radius: 3px;
  color: #1890ff;
  font-family: Consolas, Monaco, monospace;
}
.description ul {
  margin: 8px 0 0 20px;
  padding: 0;
}
.description li {
  margin-bottom: 4px;
}
</style>
