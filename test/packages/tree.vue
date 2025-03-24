<template>
  <div class="test-container">
    <h2>Tree 树形控件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-tree :data="baseData" node-key="id" />
    </test-section>

    <!-- 复选框功能 -->
    <test-section title="节点勾选">
      <t-tree ref="checkableTreeRef" :data="baseData" node-key="id" checkable @check-change="handleCheckChange" />
      <div v-if="checkedNodes.length > 0" class="result-display mt-2">
        <div class="result-title">已勾选节点：</div>
        <div v-for="(node, index) in checkedNodes" :key="index" class="result-item">{{ node.label }} (ID: {{ node }})</div>
      </div>
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
          <span v-if="node.isLeaf" style="margin-left: 8px; font-size: 12px; color: #999">(叶子节点)</span>
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
      <t-tree ref="treeRef" :data="baseData" node-key="id" selectable />
      <div v-if="selectedNodes.length > 0" class="result-display mt-2">
        <div class="result-title">已选中节点：</div>
        <div v-for="(node, index) in selectedNodes" :key="index" class="result-item">{{ node.label }} (ID: {{ node.id }})</div>
      </div>
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
const checkableTreeRef = ref<InstanceType<typeof TTree> | null>(null);
const strictTreeRef = ref<InstanceType<typeof TTree> | null>(null);

// 勾选和选中结果
const checkedNodes = ref<any[]>([]);
const selectedNodes = ref<any[]>([]);
const strictCheckedNodes = ref<any[]>([]);

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
  selectedNodes.value = [];
  console.log("暂无获取选中节点的方法");
}

// 处理节点勾选变化
function handleCheckChange(_checkedKeys: string[]) {
  checkedNodes.value = _checkedKeys;
}

// 处理严格模式下节点勾选变化
function handleStrictCheckChange(_checkedKeys: string[]) {
  strictCheckedNodes.value = _checkedKeys;
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

  .mt-2 {
    margin-top: 8px;
  }

  .result-display {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 12px;
    margin-top: 12px;
    max-width: 500px;
  }

  .result-title {
    font-weight: 500;
    margin-bottom: 8px;
    color: #334155;
  }

  .result-item {
    padding: 4px 0;
    border-bottom: 1px dashed #e2e8f0;
    color: #475569;
  }
}
</style>
