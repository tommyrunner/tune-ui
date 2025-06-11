<template>
  <div class="t-tree">
    <div v-if="!data || data.length === 0" class="t-tree__empty">
      <slot name="empty">{{ TEXT_EMPTY }}</slot>
    </div>
    <div v-else class="t-tree__wrapper">
      <tree-node
        v-for="node in rootNodes"
        :key="getNodeKey(node)"
        :node="node"
        :node-key="nodeKey"
        :label="label"
        :children="children"
        :indent="indent"
        :checkable="checkable"
        :selectable="false"
        :expand-on-click-node="expandOnClickNode"
        :disabled="disabled"
      >
        <template #default="nodeProps">
          <slot :node="nodeProps.node" :data="nodeProps.data"></slot>
        </template>
      </tree-node>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { PropsType, TreeNodeType, EmitsType } from "./tree";
import { computed, nextTick, provide, ref, watch } from "vue";
import TreeNode from "./components/tree-node/tree-node.vue";
import { treeContextKey, type TreeContext } from "./constants";
import { useI18nText } from "./i18n";

defineOptions({
  name: "TTree"
});

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  data: () => [],
  nodeKey: "id",
  label: "label",
  children: "children",
  expanded: () => [],
  checked: () => [],
  indent: 16,
  checkable: false,
  accordion: false,
  expandOnClickNode: true,
  disabled: false
});

/** 国际化文本 */
const { TEXT_EMPTY } = useI18nText();

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/** 展开的节点keys */
const expandedKeys = ref<string[]>(props.expanded);
/** 勾选的节点keys */
const checkedKeys = ref<string[]>(props.checked);
/** 节点映射表 */
const nodeMap = ref(new Map<string, TreeNodeType>());

/**
 * 根节点列表
 * @returns {TreeNodeType[]} 格式化后的根节点数组
 */
const rootNodes = computed((): TreeNodeType[] => {
  return formatNodes(props.data, null);
});

/**
 * 格式化节点数据，扩展节点属性
 * @param {any[]} nodes - 节点数据
 * @param {TreeNodeType | null} parent - 父节点
 * @returns {TreeNodeType[]} 格式化后的节点数据
 */
function formatNodes(nodes: any[], parent: TreeNodeType | null): TreeNodeType[] {
  if (!nodes || !nodes.length) return [];

  return nodes.map(node => {
    const key = getNodeKey(node);
    const isExpanded = expandedKeys.value.includes(key);
    const isChecked = checkedKeys.value.includes(key);
    const hasChildren = node[props.children]?.length > 0;

    const treeNode: TreeNodeType = {
      key,
      data: node,
      parent,
      level: parent ? parent.level + 1 : 0,
      isExpanded,
      isChecked,
      isDisabled: node.disabled || props.disabled,
      isLeaf: !hasChildren,
      hasChildren
    };

    // 存储节点引用
    nodeMap.value.set(key, treeNode);

    // 递归处理子节点
    if (hasChildren && isExpanded) {
      treeNode.children = formatNodes(node[props.children], treeNode);
    }
    return treeNode;
  });
}

/**
 * 处理节点展开/收起
 * @param {TreeNodeType} node - 节点
 * @param {boolean} expanded - 是否展开
 * @param {boolean} [deep=false] - 是否深层展开/折叠子节点
 */
function handleNodeExpand(node: TreeNodeType, expanded: boolean, deep: boolean = false) {
  // 更新当前节点展开状态
  updateNodeExpandState(node, expanded);

  // 处理手风琴模式
  if (expanded && props.accordion) {
    toggleSiblings(node);
  }

  // 深度展开/折叠子节点
  if (deep && node.hasChildren) {
    // 懒加载子节点
    ensureChildrenLoaded(node);
    // 递归处理所有子节点
    node.children?.forEach(child => {
      handleNodeExpand(child, expanded, deep);
    });
  }
}

/**
 * 更新节点展开状态
 * @param {TreeNodeType} node - 节点
 * @param {boolean} expanded - 是否展开
 */
function updateNodeExpandState(node: TreeNodeType, expanded: boolean) {
  if (expanded) {
    if (!expandedKeys.value.includes(node.key)) {
      expandedKeys.value.push(node.key);
      // 更新节点状态
      node.isExpanded = true;
      emit("node-expand", node.data, node);
    }
  } else {
    const index = expandedKeys.value.indexOf(node.key);
    if (index !== -1) {
      expandedKeys.value.splice(index, 1);
      // 更新节点状态
      node.isExpanded = false;
      emit("node-collapse", node.data, node);
    }
  }
}

/**
 * 手风琴模式下折叠同级节点
 * @param {TreeNodeType} node - 节点
 */
function toggleSiblings(node: TreeNodeType) {
  // 获取同级节点
  const siblings: TreeNodeType[] = node.parent ? getSiblings(node) : rootNodes.value.filter(n => n.key !== node.key);

  // 关闭所有同级已展开节点
  siblings.forEach(sibling => {
    if (sibling.isExpanded) {
      updateNodeExpandState(sibling, false);
    }
  });
}

/**
 * 确保子节点已加载
 * @param {TreeNodeType} node - 节点
 */
function ensureChildrenLoaded(node: TreeNodeType) {
  if (node.hasChildren && !node.children) {
    node.children = formatNodes(node.data[props.children] || [], node);
  }
}

/**
 * 处理节点勾选
 * @param {TreeNodeType} node - 节点
 * @param {boolean} checked - 是否选中
 */
function handleNodeCheck(node: TreeNodeType, checked: boolean) {
  // 先展开所有子节点
  expandAll(node, true);
  nextTick(() => {
    // 处理当前节点及其子节点的选中状态
    handleNodeCheckDeep(node, checked);
    // 触发选中事件，只返回叶子节点
    emit(
      "check-change",
      checkedKeys.value.filter(key => nodeMap.value.get(key)?.isLeaf)
    );
  });
}

/**
 * 深度处理节点勾选状态
 * @param {TreeNodeType} node - 节点
 * @param {boolean} checked - 是否选中
 */
function handleNodeCheckDeep(node: TreeNodeType, checked: boolean) {
  // 更新当前节点的选中状态
  updateNodeCheckState(node.key, checked);

  // 递归处理子节点
  if (node.children) {
    node.children.forEach(child => {
      handleNodeCheckDeep(child, checked);
    });
  }
}

/**
 * 更新节点勾选状态
 * @param {string} key - 节点key
 * @param {boolean} checked - 是否选中
 */
function updateNodeCheckState(key: string, checked: boolean) {
  if (checked) {
    if (!checkedKeys.value.includes(key)) {
      checkedKeys.value.push(key);
    }
  } else {
    const index = checkedKeys.value.indexOf(key);
    if (index !== -1) {
      checkedKeys.value.splice(index, 1);
    }
  }
}

/**
 * 获取同级节点
 * @param {TreeNodeType} node - 节点
 * @returns {TreeNodeType[]} 同级节点列表
 */
function getSiblings(node: TreeNodeType): TreeNodeType[] {
  if (!node.parent) return [];

  // 从父节点的children中找到兄弟节点
  const parent = node.parent;
  const parentData = parent.data;
  const siblings = parentData[props.children] || [];

  return siblings
    .map((sibling: any) => nodeMap.value.get(getNodeKey(sibling)))
    .filter((sibling): sibling is TreeNodeType => sibling !== undefined && sibling.key !== node.key);
}

/**
 * 全部展开
 * @param {TreeNodeType} [node] - 指定节点，不传则展开所有节点
 * @param {boolean} [deep=true] - 是否递归展开子节点
 */
function expandAll(node?: TreeNodeType, deep: boolean = true) {
  if (node) {
    // 只展开指定节点及其子节点
    handleNodeExpand(node, true, deep);
  } else {
    // 展开所有节点
    const allExpandableNodes: TreeNodeType[] = [];
    nodeMap.value.forEach(treeNode => {
      if (treeNode.hasChildren) {
        allExpandableNodes.push(treeNode);
      }
    });

    // 如果深度展开，先处理根节点
    if (deep) {
      rootNodes.value.forEach(rootNode => {
        handleNodeExpand(rootNode, true, true);
      });
    } else {
      // 如果不深度展开，只更新状态
      allExpandableNodes.forEach(node => {
        node.isExpanded = true;
        if (!expandedKeys.value.includes(node.key)) {
          expandedKeys.value.push(node.key);
        }
      });
    }
  }
}

/**
 * 全部折叠
 * @param {TreeNodeType} [node] - 指定节点，不传则折叠所有节点
 * @param {boolean} [deep=true] - 是否递归折叠子节点
 */
function collapseAll(node?: TreeNodeType, deep: boolean = true) {
  if (node) {
    // 只折叠指定节点及其子节点
    handleNodeExpand(node, false, deep);
  } else {
    // 如果深度折叠，先处理根节点
    if (deep) {
      rootNodes.value.forEach(rootNode => {
        handleNodeExpand(rootNode, false, true);
      });
    }

    // 折叠所有节点
    expandedKeys.value = [];
    // 更新所有节点的展开状态
    nodeMap.value.forEach(node => {
      node.isExpanded = false;
    });
  }
}

/**
 * 获取节点key
 * @param {any} node - 节点
 * @returns {string} 节点key
 */
function getNodeKey(node: any): string {
  return node[props.nodeKey]?.toString() || "";
}

/**
 * 获取勾选的节点keys
 * @returns {string[]} 勾选的叶子节点keys
 */
function getCheckedKeys(): string[] {
  return checkedKeys.value.filter(key => nodeMap.value.get(key)?.isLeaf);
}

/**
 * 获取勾选的节点数据
 * @returns {any[]} 勾选的叶子节点数据
 */
function getCheckedNodes(): any[] {
  return checkedKeys.value.reduce((result: any[], key) => {
    const node = nodeMap.value.get(key);
    if (node && node.isLeaf) {
      result.push(node.data);
    }
    return result;
  }, []);
}

/**
 * 设置勾选的节点keys
 * @param {string[]} keys - 节点keys
 */
function setCheckedKeys(keys: string[]) {
  checkedKeys.value = [...keys];
}

/** 通过context共享状态和方法到子组件 */
provide<TreeContext>(treeContextKey, {
  expandedKeys,
  checkedKeys,
  handleNodeExpand,
  handleNodeCheck
});

/**
 * 监听props.expanded变化
 */
watch(
  () => props.expanded,
  newVal => {
    expandedKeys.value = [...newVal];
  }
);

/**
 * 监听props.checked变化
 */
watch(
  () => props.checked,
  newVal => {
    checkedKeys.value = [...newVal];
  }
);

/**
 * 监听checkedKeys变化，更新节点选中状态
 */
watch(
  checkedKeys,
  () => {
    // 更新节点的选中状态
    nodeMap.value.forEach(node => {
      node.isChecked = checkedKeys.value.includes(node.key);
    });
  },
  { deep: true }
);

/**
 * 监听expandedKeys变化，更新节点展开状态
 */
watch(
  expandedKeys,
  () => {
    // 更新节点的展开状态
    nodeMap.value.forEach(node => {
      node.isExpanded = expandedKeys.value.includes(node.key);
    });
  },
  { deep: true }
);

/**
 * @description 暴露组件方法
 */
defineExpose({
  getCheckedKeys,
  getCheckedNodes,
  setCheckedKeys,
  expandAll,
  collapseAll
});
</script>
