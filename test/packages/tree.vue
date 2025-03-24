<template>
  <div class="test-container">
    <h2>Tree 树形控件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-tree :data="baseData" node-key="id" />
    </test-section>

    <!-- 选择功能 -->
    <test-section title="节点选择">
      <t-tree :data="baseData" node-key="id" :selected="['1-1']" />
    </test-section>

    <!-- 复选框功能 -->
    <test-section title="节点勾选">
      <t-tree :data="baseData" node-key="id" checkable />
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <t-tree :data="disabledData" node-key="id" checkable />
    </test-section>

    <!-- 显示连接线 -->
    <test-section title="显示连接线">
      <t-tree :data="baseData" node-key="id" show-line />
    </test-section>

    <!-- 手风琴模式 -->
    <test-section title="手风琴模式">
      <t-tree :data="baseData" node-key="id" accordion />
    </test-section>

    <!-- 自定义节点 -->
    <test-section title="自定义节点">
      <t-tree :data="baseData" node-key="id">
        <template #default="{ node, data }">
          <span :style="{ color: data.color || '#333' }">{{ data.label }}</span>
          <span v-if="node.isLeaf" style="margin-left: 8px; font-size: 12px; color: #999;">(叶子节点)</span>
        </template>
      </t-tree>
    </test-section>

    <!-- 方法调用 -->
    <test-section title="方法调用">
      <div class="mb-2">
        <t-button @click="handleExpandAll">展开全部</t-button>
        <t-button @click="handleCollapseAll" class="ml-2">收起全部</t-button>
        <t-button @click="handleGetSelected" class="ml-2">获取选中节点</t-button>
      </div>
      <t-tree ref="treeRef" :data="baseData" node-key="id" show-line selectable />
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TTree, TButton } from "../../src/packages";
import TestSection from "../components/test-section.vue";

defineOptions({
  name: "TreeTest"
});

// 基础数据
const baseData = [
  {
    id: "1",
    label: "一级 1",
    color: "#409eff",
    children: [
      {
        id: "1-1",
        label: "二级 1-1",
        children: [
          {
            id: "1-1-1",
            label: "三级 1-1-1"
          },
          {
            id: "1-1-2",
            label: "三级 1-1-2"
          }
        ]
      },
      {
        id: "1-2",
        label: "二级 1-2"
      }
    ]
  },
  {
    id: "2",
    label: "一级 2",
    color: "#67c23a",
    children: [
      {
        id: "2-1",
        label: "二级 2-1"
      },
      {
        id: "2-2",
        label: "二级 2-2"
      }
    ]
  },
  {
    id: "3",
    label: "一级 3",
    color: "#e6a23c",
    children: [
      {
        id: "3-1",
        label: "二级 3-1"
      },
      {
        id: "3-2",
        label: "二级 3-2"
      }
    ]
  }
];

// 禁用的数据
const disabledData = [
  {
    id: "1",
    label: "一级 1",
    disabled: true,
    children: [
      {
        id: "1-1",
        label: "二级 1-1",
        children: [
          {
            id: "1-1-1",
            label: "三级 1-1-1"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    label: "一级 2",
    children: [
      {
        id: "2-1",
        label: "二级 2-1",
        disabled: true
      },
      {
        id: "2-2",
        label: "二级 2-2"
      }
    ]
  }
];

// 方法引用
const treeRef = ref<InstanceType<typeof TTree> | null>(null);

// 处理展开全部
function handleExpandAll() {
  treeRef.value?.expandAll();
}

// 处理收起全部
function handleCollapseAll() {
  treeRef.value?.collapseAll();
}

// 获取选中节点
function handleGetSelected() {
  const nodes = treeRef.value?.getSelectedNodes();
  console.log("选中的节点:", nodes);
}
</script>

<style lang="scss" scoped>
.test-container {
  padding: 24px;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 12px;
  }

  :deep(.test-section) {
    .test-section-content {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
  }

  .mb-2 {
    margin-bottom: 8px;
  }

  .ml-2 {
    margin-left: 8px;
  }
}
</style> 