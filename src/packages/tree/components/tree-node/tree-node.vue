<template>
  <div
    class="t-tree-node"
    :class="{
      't-tree-node--expanded': node.isExpanded,
      't-tree-node--disabled': node.isDisabled
    }"
    :style="{ paddingLeft: `${props.indent * level}px` }"
  >
    <div class="t-tree-node__content" @click="handleClick">
      <!-- 展开/折叠按钮 -->
      <span
        v-if="!node.isLeaf"
        class="t-tree-node__expand-icon"
        :class="{ 't-tree-node__expand-icon--expanded': node.isExpanded }"
        @click.stop="handleExpand"
      >
        <t-icon icon="caret-right" :size="14"></t-icon>
      </span>
      <span v-else class="t-tree-node__placeholder"></span>

      <!-- 复选框 -->
      <span v-if="checkable" class="t-tree-node__checkbox">
        <t-checkbox v-bind="checkedFn" :disabled="node.isDisabled" @change="handleCheck" @click.stop></t-checkbox>
      </span>

      <!-- 自定义内容 -->
      <div class="t-tree-node__label">
        <slot :node="node" :data="node.data">{{ node.data[label] }}</slot>
      </div>
    </div>

    <!-- 子节点 -->
    <div v-if="node.children && node.children.length && node.isExpanded" class="t-tree-node__children">
      <tree-node
        v-for="child in node.children"
        :key="child.key"
        :node="child"
        :node-key="nodeKey"
        :label="label"
        :children="children"
        :level="level + 1"
        :indent="indent"
        :checkable="checkable"
        :selectable="selectable"
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
import { computed, inject } from "vue";
import { TIcon } from "../../../icon";
import { TCheckbox } from "../../../checkbox";
import type { NodePropsType, TreeNode } from "../../tree";
import { treeContextKey, type TreeContext } from "../../constants";

defineOptions({
  name: "TTreeNode"
});

// 组件Props
const props = withDefaults(defineProps<NodePropsType>(), {
  level: 0,
  indent: 16,
  checkable: false,
  selectable: false,
  expandOnClickNode: true,
  disabled: false
});

// 注入tree上下文
const treeContext = inject<TreeContext>(treeContextKey);

// 节点层级
const level = computed(() => {
  return props.node.level;
});

// 处理节点展开/折叠
function handleExpand() {
  if (props.node.isDisabled) return;

  const node = props.node;
  const expanded = !node.isExpanded;

  treeContext?.handleNodeExpand(node, expanded);
}

// 处理节点点击
function handleClick() {
  if (props.node.isDisabled) return;

  const node = props.node;

  if (props.expandOnClickNode && !node.isLeaf) {
    handleExpand();
  }
}

// 处理节点勾选
function handleCheck(checked: boolean) {
  if (props.node.isDisabled) return;
  treeContext?.handleNodeCheck(props.node, checked);
}
/**
 * 计算复选框的值，全选/半选/不选
 * 全选: 子节点全选中
 * 半选: 子节点有选中，也有未选中
 * 不选: 子节点全未选中
 */
const checkedFn = computed(() => {
  let checkedShow = props.node.isChecked;
  let indeterminateShow = false;
  // 如果节点有子节点，则需要计算半选状态
  if (props.node.children && props.node.children.length) {
    // 判断子节点 全选 半选 不选
    const checkedStatus = getCheckedDeep(props.node);
    if (checkedStatus === 1) {
      checkedShow = true;
      indeterminateShow = false;
    } else if (checkedStatus === 0) {
      checkedShow = true;
      indeterminateShow = true;
    } else {
      checkedShow = false;
      indeterminateShow = false;
    }
  }
  return {
    modelValue: checkedShow,
    indeterminate: indeterminateShow
  };
});
/**
 * 递归判断子节点选中状态
 * @param node 节点
 * @return {number} 1:全选 0:半选 -1:不选
 */
const getCheckedDeep = (node: TreeNode): number => {
  if (!node.children || node.children.length === 0) {
    return node.isChecked ? 1 : -1;
  }
  const childrenChecked = node.children.map(child => getCheckedDeep(child));
  const allChecked = childrenChecked.every(status => status === 1);
  const someChecked = childrenChecked.some(status => status === 1);
  if (allChecked) {
    return 1;
  } else if (someChecked) {
    return 0;
  } else {
    return -1;
  }
};
</script>

<style lang="scss" scoped>
@import "./tree-node.scss";
</style>
