import type { MenuItemType } from "../../menu";

/**
 * @description MenuItem组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 菜单项数据 */
  menuItem: MenuItemType;
  /** 菜单层级 */
  level?: number;
  /** 是否为弹出模式 */
  popupMode?: boolean;
}

/**
 * @description MenuItem组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 菜单项内容 */
  default?: () => any;
  /** 图标插槽 */
  icon?: () => any;
  /** 标题插槽 */
  title?: () => any;
}

/**
 * @description MenuItem组件暴露方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 处理菜单项点击 */
  handleClick: () => void;
}
