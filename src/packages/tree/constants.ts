import type { InjectionKey, Ref } from "vue";
import type { TreeNodeType } from "./tree";

/**
 * @description 树组件上下文
 * @interface TreeContext
 */
export interface TreeContext {
  /** 展开的节点keys */
  expandedKeys: Ref<string[]>;
  /** 勾选的节点keys */
  checkedKeys: Ref<string[]>;
  /** 处理节点展开/折叠 */
  handleNodeExpand: (node: TreeNodeType, expanded: boolean) => void;
  /** 处理节点勾选 */
  handleNodeCheck: (node: TreeNodeType, checked: boolean) => void;
}

/**
 * @description Tree组件上下文的注入键
 */
export const treeContextKey: InjectionKey<TreeContext> = Symbol("treeContextKey");
