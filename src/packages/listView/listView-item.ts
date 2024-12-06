/**
 * value 类型
 */
export type ValueType = string | number;
/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 固定高度
  height?: number;
  // 固定列-虚拟列表不支持
  fixed?: boolean;
  // 虚拟列表固定top
  top?: number;
}
