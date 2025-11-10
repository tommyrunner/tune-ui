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
  },
  {
    id: "3",
    label: "Level 1 Node 3"
  }
]);
</script>

<style scoped>
.tree-demo {
  padding: 16px 0;
  max-width: 400px;
}
</style>
