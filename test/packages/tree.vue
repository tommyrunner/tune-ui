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
      <t-dialog v-model="dialogState.showDialog" title="添加节点" width="400px">
        <t-form :model="dialogState.newNode" :rules="nodeFormRules" ref="nodeFormRef" @submit="confirmAddNode">
          <t-form-item label="节点ID" prop="id" tip="输入唯一的节点标识符">
            <t-input v-model="dialogState.newNode.id" placeholder="请输入节点ID" />
          </t-form-item>
          <t-form-item label="节点标签" prop="label" tip="输入节点显示的文本">
            <t-input v-model="dialogState.newNode.label" placeholder="请输入节点标签" />
          </t-form-item>
          <t-form-item label="父节点" prop="parentId" tip="选择新节点的父节点">
            <t-select
              v-model="dialogState.newNode.parentId"
              :options="availableParentNodes"
              :clearable="true"
              :select-parent="true"
              placeholder="不选择则添加为根节点"
            />
          </t-form-item>
        </t-form>
        <template #footer>
          <div></div>
        </template>
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
import { TForm, TFormItem } from "@/packages/form";
import TestSection from "../components/test-section.vue";
import { TreeNodeType } from "@/packages/tree/tree";
import { TSelect } from "@/packages/select";
import type { FormItemRule, FormItemTrigger } from "@/packages/form/form";
import type { TFormType } from "@/packages/form";

defineOptions({
  name: "TreeTest"
});

/**
 * Select选项接口
 */
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  children?: SelectOption[];
}

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

// 表单引用
const nodeFormRef = ref<TFormType>();

// 表单验证规则
const nodeFormRules = {
  id: [
    { required: true, message: "请输入节点ID", trigger: "blur" as FormItemTrigger },
    { pattern: /^[a-zA-Z0-9_-]+$/, message: "ID只能包含字母、数字、下划线和连字符", trigger: "blur" as FormItemTrigger }
  ],
  label: [{ required: true, message: "请输入节点标签", trigger: "blur" as FormItemTrigger }]
} as Record<string, FormItemRule[]>;

/**
 * 递归格式化，将数据转换为select格式，保持树形结构
 */
const availableParentNodes = computed(() => {
  const formatData = (nodes: any[]): SelectOption[] => {
    return nodes.map(node => {
      const result: SelectOption = {
        value: node.id,
        label: node.label,
        disabled: node.disabled
      };

      if (node.children && node.children.length > 0) {
        result.children = formatData(node.children);
      }

      return result;
    });
  };

  return formatData(editableData);
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
const confirmAddNode = async () => {
  // 校验表单
  if (!nodeFormRef.value) return;

  const valid = await nodeFormRef.value.validate();
  if (!valid) return;

  const newNodeObj = {
    id: dialogState.newNode.id,
    label: dialogState.newNode.label,
    children: []
  };

  // 添加到根节点
  if (!dialogState.newNode.parentId) {
    editableData.push(newNodeObj);
  } else {
    /**
     * 递归找到指定父节点，并添加新节点
     * @param nodes 节点列表
     */
    const findAndAddNode = (nodes: any[]) => {
      nodes.forEach(node => {
        if (node.id === dialogState.newNode.parentId) {
          if (node.children) {
            node.children.push(newNodeObj);
          } else {
            node.children = [newNodeObj];
          }
          // 展开节点
          editableTreeRef.value?.expandByKey();
          // 找到后直接返回，避免继续递归
          return;
        }
        if (node.children && node.children.length > 0) {
          return findAndAddNode(node.children);
        }
      });
    };
    findAndAddNode(editableData);
  }

  dialogState.showDialog = false;

  // 重置表单
  nodeFormRef.value.resetFields();
};

// 确认删除节点
const confirmDeleteNode = (node: TreeNodeType) => {
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
  // 展开第一个节点及其所有子节点
  treeRef.value?.expandByKey();
}

// 处理收起全部
function handleCollapseAll() {
  // 收起第一个节点及其所有子节点
  treeRef.value?.collapseByKey();
}

// 处理节点勾选变化
function handleCheckChange(_checkedKeys: string[]) {
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
</style>
