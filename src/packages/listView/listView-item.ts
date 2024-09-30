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
  zIndex?: number;
  row?: any;
  defBgColor?: string;
  isHoverBg?: boolean;
  hoverBgColor?: string;
}
