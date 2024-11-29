/**
 * value 类型
 */
export type ValueType = string | number;
/**
 * @description: 组件props类型
 */
export interface PropsType {
  id?: number;
  top?: number;
  isVirtualized?: boolean;
  // 是否固定行
  isFixed?: boolean;
  height?: number;
  row?: any;
  defBgColor?: string;
  isHoverBg?: boolean;
  hoverBgColor?: string;
}
