<template>
  <div class="tree-demo">
    <t-tree :data="treeData" checkable @check-change="handleCheckChange"></t-tree>

    <div class="result-container">
      <div class="result-title">当前选中的节点：</div>
      <div v-if="checkedNodes.length" class="result-list">
        <div v-for="(node, index) in checkedNodes" :key="index" class="result-item">
          {{ node }}
        </div>
      </div>
      <div v-else class="result-empty">暂无选中节点</div>
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

const checkedNodes = ref([]);

const handleCheckChange = checkedKeys => {
  // 根据选中的key找到对应的label
  checkedNodes.value = checkedKeys
    .map(key => {
      const findNode = (nodes, key) => {
        for (const node of nodes) {
          if (node.id === key) return node.label;
          if (node.children) {
            const found = findNode(node.children, key);
            if (found) return found;
          }
        }
        return null;
      };
      return findNode(treeData.value, key);
    })
    .filter(Boolean);
};
</script>

<style scoped>
.tree-demo {
  padding: 16px 0;
  max-width: 400px;
}
.result-container {
  margin-top: 20px;
  padding: 12px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}
.result-title {
  font-weight: bold;
  margin-bottom: 8px;
}
.result-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.result-item {
  background-color: #f0f9eb;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  color: #67c23a;
}
.result-empty {
  color: #909399;
  font-size: 14px;
}
</style>
