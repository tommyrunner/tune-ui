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
 */
export interface EmitsType {
  /** 菜单项选中事件 */
  (e: "select", menuItem: MenuItemType): void;
  /** 菜单项展开/收起事件 */
  (e: "expand", expandKeys: string[]): void;
  /** 菜单模式变更事件 */
  (e: "modeChange", mode: ModeType): void;
  /** 更新modelValue事件 */
  (e: "update:active", id: string): void;
  /** 更新expandKeys事件 */
  (e: "update:expandKeys", expandKeys: string[]): void;
  /** 更新mode事件 */
  (e: "update:mode", mode: ModeType): void;
}
