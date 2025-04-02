import type { InjectionKey, Ref } from "vue";
import type { MenuItemType, ModeType } from "./menu";
import type { PropsType as PopoverType } from "@/packages/popover/popover";

/**
 * @description 默认模式
 */
export const DEFAULT_MODE = "expand";

/**
 * @description 默认菜单宽度
 */
export const DEFAULT_WIDTH = "240px";

/**
 * @description 默认折叠模式宽度
 */
export const DEFAULT_COLLAPSE_WIDTH = "60px";

/**
 * @description 菜单列表最大高度
 */
export const MAX_MENU_HEIGHT = "calc(100vh - 60px)";

/**
 * @description 菜单上下文类型
 * @interface MenuContextType
 */
export interface MenuContextType {
  /** 当前激活的菜单项ID */
  activeId: Ref<string>;
  /** 当前展开的菜单项ID数组 */
  expandKeys: Ref<string[]>;
  /** 菜单模式 */
  mode: Ref<ModeType>;
  /** 是否使用手风琴模式 */
  accordion: boolean;
  /** 是否自动展开所有子节点 */
  autoExpand: boolean;
  /** 弹出层类型 */
  popoverType: PopoverType["type"];
  /** 弹出层宽度 */
  popoverWidth: PopoverType["width"];
  /** 选择菜单项处理函数 */
  handleSelect: (menuItem: MenuItemType) => void;
  /** 切换展开状态处理函数 */
  toggleExpand: (id: string) => void;
}

/**
 * @description 菜单上下文注入键
 */
export const menuContextKey: InjectionKey<MenuContextType> = Symbol("menuContext");
