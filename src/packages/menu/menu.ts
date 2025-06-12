import type { IconTypes } from "@/packages/icon/icon";
import type { PropsType as PopoverType } from "@/packages/popover/popover";

/**
 * @description 菜单项类型
 */
export interface MenuItemType {
  /** 唯一标识 */
  id: string;
  /** 标题 */
  title: string;
  /** 图标 */
  icon?: IconTypes;
  /** 禁用状态 */
  disabled?: boolean;
  /** 子菜单项 */
  children?: MenuItemType[];
}

/**
 * @description 菜单模式类型
 */
export type ModeType = "expand" | "collapse";

/**
 * @description 菜单组件属性类型
 */
export interface PropsType {
  /** 菜单数据 */
  data?: MenuItemType[];
  /** 当前激活的菜单项ID */
  active?: string;
  /** 当前展开的菜单项ID数组 */
  expandKeys?: string[];
  /** 菜单模式 */
  mode?: ModeType;
  /** 是否使用手风琴模式 */
  accordion?: boolean;
  /** 是否自动展开所有子节点 */
  autoExpand?: boolean;
  /** 菜单宽度，展开模式 */
  width?: number | string;
  /** 菜单宽度，折叠模式 */
  collapseWidth?: number | string;
  /** 弹出层类型 */
  popoverType?: PopoverType["type"];
  /** 弹出层宽度 */
  popoverWidth?: PopoverType["width"];
}

/**
 * @description 菜单组件事件类型
 * @interface EmitsType
 */
export interface EmitsType {
  /** 菜单项选中事件 */
  select: [MenuItemType];
  /** 菜单项展开/收起事件 */
  expand: [string[]];
  /** 菜单模式变更事件 */
  modeChange: [ModeType];
  /** 更新modelValue事件 */
  "update:active": [string];
  /** 更新expandKeys事件 */
  "update:expandKeys": [string[]];
  /** 更新mode事件 */
  "update:mode": [ModeType];
}

/**
 * @description 菜单组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 菜单内容 */
  default?: () => any;
}

/**
 * @description 菜单组件暴露方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 展开所有菜单项 */
  expandAll: () => void;
  /** 收起所有菜单项 */
  collapseAll: () => void;
  /** 切换菜单模式 */
  toggleMode: () => void;
  /** 获取当前激活的菜单项 */
  getActiveItem: () => MenuItemType | undefined;
}
