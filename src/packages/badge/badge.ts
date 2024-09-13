/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 是否显示圆点
  isDot?: boolean;
  // 自定义值
  value?: number;
  // 偏移值
  offsetX?: number;
  offsetY?: number;
  // 最大值超过显示+
  max?: number;
  // 自定义背景色
  color?: string;
  // 隐藏值
  hiddenValue?: number;
}
