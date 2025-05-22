<template>
  <div class="tree-demo">
    <div class="demo-row">
      <div class="label">点击节点展开/折叠:</div>
      <t-tree :data="treeData" :expand-on-click-node="true"></t-tree>
    </div>

    <div class="demo-row">
      <div class="label">仅点击箭头展开/折叠:</div>
      <t-tree :data="treeData" :expand-on-click-node="false"></t-tree>
    </div>

    <div class="description">
      <p>通过设置 <code>expand-on-click-node</code> 属性可以控制节点的展开/折叠方式：</p>
      <ul>
        <li><code>true</code>: 点击节点时展开/折叠（默认行为）</li>
        <li><code>false</code>: 只能通过点击箭头图标展开/折叠</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const treeData = ref([
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
          },
          {
            id: "1-1-2",
            label: "三级节点 1-1-2"
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
