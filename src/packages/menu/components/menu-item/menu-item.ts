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
