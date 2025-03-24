<template>
  <div class="t-tree">
    <div v-if="!data || data.length === 0" class="t-tree__empty">
      <slot name="empty">暂无数据</slot>
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
import type { PropsType, TreeNode as TreeNodeType } from "./tree";
import { computed, nextTick, provide, ref, watch } from "vue";
import TreeNode from "./components/tree-node/tree-node.vue";
import { treeContextKey, type TreeContext } from "./constants";

defineOptions({
  name: "TTree"
});

// Props定义
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

// 定义事件
const emit = defineEmits(["node-expand", "node-collapse", "check-change"]);

// 内部状态
const expandedKeys = ref<string[]>(props.expanded);
const checkedKeys = ref<string[]>(props.checked);
const nodeMap = ref(new Map<string, TreeNodeType>());

// 根节点
const rootNodes = computed(() => {
  return formatNodes(props.data, null);
});

// 格式化节点数据，扩展节点属性
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
 * @param node 节点
 * @param expanded 是否展开
 * @param deep 是否深层展开/折叠子节点，默认false
 */
function handleNodeExpand(node: TreeNodeType, expanded: boolean, deep: boolean = false) {
  const key = node.key;

  if (expanded) {
    // 手风琴模式，同级节点只能展开一个
    if (props.accordion) {
      // 获取同级节点
      let siblings: TreeNodeType[] = [];

      if (node.parent) {
        // 如果有父节点，则获取父节点下的所有子节点（除了当前节点）
        siblings = getSiblings(node);
      } else {
        // 如果是根节点，则获取所有根节点（除了当前节点）
        siblings = rootNodes.value.filter(n => n.key !== node.key);
      }

      // 关闭所有同级已展开节点
      siblings.forEach(sibling => {
        const siblingKey = sibling.key;
        const index = expandedKeys.value.indexOf(siblingKey);
        if (index !== -1) {
          expandedKeys.value.splice(index, 1);
          // 同时需要更新节点的isExpanded状态
          if (nodeMap.value.has(siblingKey)) {
            const siblingNode = nodeMap.value.get(siblingKey)!;
            siblingNode.isExpanded = false;
          }
          emit("node-collapse", sibling.data, sibling);
        }
      });
    }

    // 展开当前节点
    if (!expandedKeys.value.includes(key)) {
      expandedKeys.value.push(key);
      // 更新节点的isExpanded状态
      if (nodeMap.value.has(key)) {
        const currentNode = nodeMap.value.get(key)!;
        currentNode.isExpanded = true;
      }
      emit("node-expand", node.data, node);
    }
  } else {
    // 折叠当前节点
    const index = expandedKeys.value.indexOf(key);
    if (index !== -1) {
      expandedKeys.value.splice(index, 1);
      // 更新节点的isExpanded状态
      if (nodeMap.value.has(key)) {
        const currentNode = nodeMap.value.get(key)!;
        currentNode.isExpanded = false;
      }
      emit("node-collapse", node.data, node);
    }
  }

  // 深度展开/折叠子节点
  if (deep && node.hasChildren) {
    // 确保子节点已加载
    if (!node.children) {
      node.children = formatNodes(node.data[props.children] || [], node);
    }

    // 递归处理所有子节点
    node.children.forEach(child => {
      handleNodeExpand(child, expanded, deep);
    });
  }
}

/**
 * 处理节点勾选(如果节点有子节点，则子节点也勾选，深层嵌套)
 * @param node 节点
 * @param checked 是否选中
 */
function handleNodeCheck(node: TreeNodeType, checked: boolean) {
  // 先展开所有子节点
  expandAll(node, true);
  nextTick(() => {
    // 处理当前节点选中
    handleNodeCheckDeep(node, checked);
    // 触发选中事件
    emit(
      "check-change",
      checkedKeys.value.filter(key => nodeMap.value.get(key)?.isLeaf)
    );
  });
}
/**
 * 递归处理节点选中状态
 * @param node 节点
 * @param checked 是否选中
 */
function handleNodeCheckDeep(node: TreeNodeType, checked: boolean) {
  const key = node.key;
  // 处理当前节点选中
  if (checked) {
    if (!checkedKeys.value.includes(key)) {
      checkedKeys.value.push(key);
    }
  } else removeNode(node);
  // 处理深度选中
  if (node.children) {
    node.children.forEach(child => {
      child.isChecked = checked;
      if (checked) {
        if (!checkedKeys.value.includes(child.key)) checkedKeys.value.push(child.key);
      } else {
        checkedKeys.value = checkedKeys.value.filter(key => key !== child.key);
      }
      handleNodeCheckDeep(child, checked);
    });
  }
}

// 获取同级节点
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
 * @param node 指定节点，不传则展开所有节点
 * @param deep 是否递归展开子节点，默认true
 */
function expandAll(node?: TreeNodeType, deep: boolean = true) {
  if (node) {
    // 只展开指定节点及其子节点
    handleNodeExpand(node, true, deep);

    if (!deep) {
      // 如果不递归展开，则只添加当前节点到展开列表
      if (!expandedKeys.value.includes(node.key)) {
        expandedKeys.value.push(node.key);
      }
    } else {
      // 如果递归展开，则需要获取所有子节点并添加到展开列表
      const collectExpandedKeys = (currentNode: TreeNodeType): string[] => {
        let keys: string[] = [currentNode.key];

        // 如果有子节点且已加载，则递归收集子节点的key
        if (currentNode.hasChildren) {
          // 确保子节点已加载
          if (!currentNode.children) {
            currentNode.children = formatNodes(currentNode.data[props.children] || [], currentNode);
          }

          currentNode.children.forEach(child => {
            keys = keys.concat(collectExpandedKeys(child));
          });
        }

        return keys;
      };

      // 收集所有需要展开的节点key
      const keysToExpand = collectExpandedKeys(node);

      // 添加到展开列表中
      keysToExpand.forEach(key => {
        if (!expandedKeys.value.includes(key)) {
          expandedKeys.value.push(key);
        }
      });
    }
  } else {
    // 展开所有节点
    const allKeys: string[] = [];
    nodeMap.value.forEach(treeNode => {
      if (treeNode.hasChildren) {
        allKeys.push(treeNode.key);
      }
    });
    expandedKeys.value = allKeys;

    // 如果启用深度展开，递归处理所有根节点
    if (deep) {
      rootNodes.value.forEach(rootNode => {
        handleNodeExpand(rootNode, true, true);
      });
    }
  }
}

/**
 * 全部折叠
 * @param node 指定节点，不传则折叠所有节点
 * @param deep 是否递归折叠子节点，默认true
 */
function collapseAll(node?: TreeNodeType, deep: boolean = true) {
  if (node) {
    // 只折叠指定节点及其子节点
    handleNodeExpand(node, false, deep);

    if (deep) {
      // 如果递归折叠，则需要删除当前节点及其所有子节点的key
      const collectKeys = (currentNode: TreeNodeType): string[] => {
        let keys: string[] = [currentNode.key];

        // 如果有子节点且已加载，则递归收集子节点的key
        if (currentNode.children && currentNode.children.length) {
          currentNode.children.forEach(child => {
            keys = keys.concat(collectKeys(child));
          });
        }

        return keys;
      };

      // 收集所有需要从展开列表中移除的key
      const keysToRemove = collectKeys(node);

      // 从展开列表中移除
      expandedKeys.value = expandedKeys.value.filter(key => !keysToRemove.includes(key));
    } else {
      // 如果不递归折叠，则只移除当前节点
      const index = expandedKeys.value.indexOf(node.key);
      if (index !== -1) {
        expandedKeys.value.splice(index, 1);
      }
    }
  } else {
    // 如果启用深度折叠，先递归折叠所有根节点
    if (deep) {
      rootNodes.value.forEach(rootNode => {
        handleNodeExpand(rootNode, false, true);
      });
    }

    // 折叠所有节点
    expandedKeys.value = [];
  }
}
/**
 * 获取节点key
 * @param node 节点
 * @returns 节点key
 */
function getNodeKey(node: any): string {
  return node[props.nodeKey]?.toString() || "";
}
/**
 * 移除节点
 * @param node 节点
 */
function removeNode(node: TreeNodeType) {
  const index = checkedKeys.value.indexOf(node.key);
  if (index !== -1) {
    checkedKeys.value.splice(index, 1);
  }
}

// 通过context共享状态和方法到子组件
provide<TreeContext>(treeContextKey, {
  expandedKeys,
  checkedKeys,
  handleNodeExpand,
  handleNodeCheck
});

// 监听props变化
watch(
  () => props.expanded,
  newVal => {
    expandedKeys.value = [...newVal];
  }
);

watch(
  () => props.checked,
  newVal => {
    checkedKeys.value = [...newVal];
  }
);

// 导出公共方法
/**
 * 获取勾选的节点（只返回叶子节点）
 * @returns 勾选的叶子节点列表
 */
function getCheckedNodes() {
  // 只返回叶子节点
  return checkedKeys.value
    .map(key => {
      const node = nodeMap.value.get(key);
      // 只返回叶子节点
      return node && node.isLeaf ? node.data : null;
    })
    .filter(Boolean);
}

// 暴露组件方法
defineExpose({
  expandAll,
  collapseAll,
  getCheckedNodes
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
