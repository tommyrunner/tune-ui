<template>
  <div class="tree-demo">
    <t-tree :data="treeData" checkable :expanded="defaultExpanded" :checked="defaultChecked"></t-tree>

    <div class="description">
      默认展开节点: 一级节点 1, 二级节点 1-1<br />
      默认选中节点: 三级节点 1-1-2, 二级节点 2-1
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

// 默认展开的节点
const defaultExpanded = ref(["1", "1-1"]);

// 默认选中的节点
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
