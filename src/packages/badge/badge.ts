/**
 * 徽章组件属性类型定义
 */
export interface PropsType {
  /** 是否显示小圆点 */
  isDot?: boolean;
  /** 显示的数值 */
  value?: number;
  /** X轴偏移量 */
  offsetX?: number;
  /** Y轴偏移量 */
  offsetY?: number;
  /** 最大显示数值 */
  max?: number;
  /** 自定义背景色 */
  color?: string;
  /** 隐藏时的数值 */
  hiddenValue?: number;
}
