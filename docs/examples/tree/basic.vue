<template>
  <div class="tree-demo">
    <t-tree :data="treeData"></t-tree>
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
  },
  {
    id: "3",
    label: "一级节点 3"
  }
]);
</script>

<style scoped>
.tree-demo {
  padding: 16px 0;
  max-width: 400px;
}
</style>
