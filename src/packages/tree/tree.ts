/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 数据源 */
  data: any[];
  /** 节点Key字段 */
  nodeKey?: string;
  /** 节点标签字段 */
  label?: string;
  /** 子节点字段 */
  children?: string;
  /** 默认展开的节点 */
  expanded?: string[];
  /** 默认勾选的节点 */
  checked?: string[];
  /** 节点缩进距离 */
  indent?: number;
  /** 节点是否可勾选 */
  checkable?: boolean;
  /** 是否手风琴模式 */
  accordion?: boolean;
  /** 点击节点是否展开 */
  expandOnClickNode?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 节点展开事件 */
  "node-expand": [data: any, node: TreeNodeType];
  /** 节点折叠事件 */
  "node-collapse": [data: any, node: TreeNodeType];
  /** 节点勾选状态变化事件 */
  "check-change": [checkedKeys: string[]];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 自定义节点内容 */
  default?: (props: { node: TreeNodeType; data: any }) => any;
}

/**
 * @description 组件暴露方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 获取勾选的节点keys */
  getCheckedKeys: () => string[];
  /** 获取勾选的节点数据 */
  getCheckedNodes: () => any[];
  /** 设置勾选的节点keys */
  setCheckedKeys: (keys: string[]) => void;
  /** 展开所有节点 */
  expandAll: () => void;
  /** 折叠所有节点 */
  collapseAll: () => void;
}

/**
 * @description 树节点数据结构
 * @interface TreeNodeType
 */
export interface TreeNodeType {
  /** 节点唯一标识 */
  key: string;
  /** 节点原始数据 */
  data: any;
  /** 父节点 */
  parent: TreeNodeType | null;
  /** 子节点 */
  children?: TreeNodeType[];
  /** 节点层级 */
  level: number;
  /** 是否展开 */
  isExpanded: boolean;
  /** 是否勾选 */
  isChecked: boolean;
  /** 是否禁用 */
  isDisabled: boolean;
  /** 是否为叶子节点 */
  isLeaf: boolean;
  /** 是否有子节点 */
  hasChildren: boolean;
}

/**
 * @description 节点组件Props类型定义
 * @interface NodePropsType
 */
export interface NodePropsType {
  /** 节点数据 */
  node: TreeNodeType;
  /** 节点Key字段 */
  nodeKey: string;
  /** 节点标签字段 */
  label: string;
  /** 子节点字段 */
  children: string;
  /** 节点层级 */
  level?: number;
  /** 节点缩进距离 */
  indent?: number;
  /** 是否显示复选框 */
  checkable?: boolean;
  /** 点击节点是否展开 */
  expandOnClickNode?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可选择 */
  selectable?: boolean;
}
