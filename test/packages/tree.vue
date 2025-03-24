<template>
  <div class="test-container">
    <h2>Tree 树形控件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-tree :data="baseData" node-key="id" />
    </test-section>

    <!-- 复选框功能 -->
    <test-section title="节点勾选（只返回叶子节点）">
      <t-tree ref="checkableTreeRef" :data="baseData" node-key="id" checkable @check-change="handleCheckChange" />
      <div v-if="checkedNodes.length > 0" class="result-display mt-2">
        <div class="result-title">已勾选叶子节点：</div>
        <div v-for="(node, index) in checkedNodes" :key="index" class="result-item">{{ node.label }} (ID: {{ node.id }})</div>
      </div>
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <t-tree :data="disabledData" node-key="id" checkable />
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
      </div>
      <t-tree ref="treeRef" :data="baseData" node-key="id" selectable />
      <div v-if="selectedNodes.length > 0" class="result-display mt-2">
        <div class="result-title">已选中节点：</div>
        <div v-for="(node, index) in selectedNodes" :key="index" class="result-item">{{ node.label }} (ID: {{ node.id }})</div>
      </div>
    </test-section>

    <!-- 节点添加和删除 -->
    <test-section title="节点添加和删除">
      <div class="mb-2">
        <t-button @click="showAddNodeDialog">添加节点</t-button>
      </div>
      <t-tree ref="editableTreeRef" :data="editableData" node-key="id">
        <template #default="{ node, data }">
          <div class="editable-node">
            <span>{{ data.label }}</span>
            <span class="delete-btn" @click.stop="confirmDeleteNode(node)">
              <t-icon icon="close-to" :size="14" />
            </span>
          </div>
        </template>
      </t-tree>

      <!-- 使用TDialog组件 -->
      <t-dialog v-model="dialogState.showDialog" title="添加节点" width="400px" @confirm="confirmAddNode">
        <div class="dialog-body">
          <div class="form-group">
            <label>节点ID：</label>
            <t-input v-model="dialogState.newNode.id" type="text" placeholder="请输入节点ID" style="width: 100%" />
          </div>
          <div class="form-group">
            <label>节点标签：</label>
            <t-input v-model="dialogState.newNode.label" type="text" placeholder="请输入节点标签" style="width: 100%" />
          </div>
          <div class="form-group">
            <label>父节点：</label>
            <select v-model="dialogState.newNode.parentId" class="select-control" style="width: 100%">
              <option value="">根节点</option>
              <option v-for="node in availableParentNodes" :key="node.id" :value="node.id">
                {{ node.label }}
              </option>
            </select>
          </div>
        </div>
      </t-dialog>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from "vue";
import { TTree } from "@/packages/tree";
import { TButton } from "@/packages/button";
import { TIcon } from "@/packages/icon";
import { TDialog } from "@/packages/dialog";
import { TInput } from "@/packages/input";
import TestSection from "../components/test-section.vue";
import { TreeNode } from "@/packages/tree/tree";

defineOptions({
  name: "TreeTest"
});

// 基础数据
const baseData = reactive([
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
]);

// 禁用的数据
const disabledData = reactive([
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
]);

// 方法引用
const treeRef = ref<InstanceType<typeof TTree> | null>(null);
const checkableTreeRef = ref<InstanceType<typeof TTree> | null>(null);
const editableTreeRef = ref<InstanceType<typeof TTree> | null>(null);

// 勾选和选中结果 - 使用reactive替代ref
const checkedNodes = reactive<any[]>([]);
const selectedNodes = reactive<any[]>([]);

// 可编辑树的数据 - 使用reactive替代ref
const editableData = reactive([
  {
    id: "1",
    label: "一级 1",
    children: [
      {
        id: "1-1",
        label: "二级 1-1"
      }
    ]
  },
  {
    id: "2",
    label: "一级 2",
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
  }
]);

// 弹窗控制 - 使用reactive替代ref
const dialogState = reactive({
  showDialog: false,
  newNode: {
    id: "",
    label: "",
    parentId: ""
  }
});

// 可用的父节点列表
const availableParentNodes = computed(() => {
  const flatNodes: any[] = [];
  const flattenNodes = (nodes: any[], level = 0) => {
    nodes.forEach(node => {
      flatNodes.push({
        id: node.id,
        label: "".padStart(level * 2, "　") + node.label
      });
      if (node.children && node.children.length > 0) {
        flattenNodes(node.children, level + 1);
      }
    });
  };
  flattenNodes(editableData);
  return flatNodes;
});

// 添加节点对话框
const showAddNodeDialog = () => {
  dialogState.newNode = {
    id: "",
    label: "",
    parentId: ""
  };
  dialogState.showDialog = true;
};

// 确认添加节点
const confirmAddNode = () => {
  if (!dialogState.newNode.id || !dialogState.newNode.label) {
    alert("节点ID和标签不能为空");
    return;
  }

  const newNodeObj = {
    id: dialogState.newNode.id,
    label: dialogState.newNode.label,
    children: []
  };
  // 添加到根节点
  if (!dialogState.newNode.parentId) {
    editableData.push(newNodeObj);
  } else {
    // 添加到指定父节点
    const findAndAddNode = (nodes: any[]) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === dialogState.newNode.parentId) {
          if (!nodes[i].children) {
            nodes[i].children = [];
          }
          nodes[i].children.push(newNodeObj);
          return true;
        }
        if (nodes[i].children && nodes[i].children.length > 0) {
          if (findAndAddNode(nodes[i].children)) {
            return true;
          }
        }
      }
      return false;
    };
    findAndAddNode(editableData);
  }

  dialogState.showDialog = false;
};

// 确认删除节点
const confirmDeleteNode = (node: TreeNode) => {
  if (confirm(`确定要删除节点 "${node.data.label}" 吗？`)) {
    const findAndRemoveNode = (nodes: any[]) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === node.data.id) {
          nodes.splice(i, 1);
          return true;
        }
        if (nodes[i].children && nodes[i].children.length > 0) {
          if (findAndRemoveNode(nodes[i].children)) {
            return true;
          }
        }
      }
      return false;
    };
    findAndRemoveNode(editableData);
  }
};

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
  // 清空数组，保持响应式
  selectedNodes.length = 0;
  console.log("暂无获取选中节点的方法");
}

// 处理节点勾选变化
function handleCheckChange(_checkedKeys: string[]) {
  console.log(_checkedKeys);
  const nodes = checkableTreeRef.value?.getCheckedNodes();
  // 清空数组并添加新元素，保持响应式
  checkedNodes.length = 0;
  if (nodes && nodes.length > 0) {
    nodes.forEach(node => checkedNodes.push(node));
  }
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

.editable-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 8px;

  .delete-btn {
    opacity: 0;
    transition: opacity 0.2s;
    cursor: pointer;
    color: #999;

    &:hover {
      color: #f56c6c;
    }
  }

  &:hover .delete-btn {
    opacity: 1;
  }
}

.form-group {
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
  }

  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #409eff;
    }
  }
}

.select-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: #409eff;
  }
}
</style>
