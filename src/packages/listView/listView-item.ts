/**
 * value 类型
 */
export type ValueType = string | number;
/**
 * @description 列表项属性类型定义
 */
export interface PropsType {
  /** 项目高度 */
  height?: number;
  /** 是否固定项 */
  fixed?: boolean;
  /** 虚拟列表定位位置 */
  top?: number;
}
