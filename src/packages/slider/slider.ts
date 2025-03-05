export interface SliderMark {
  value: number;
  position: string;
  style?: Record<string, string>;
  label?: string | number;
}

export type SliderFormatTooltip = (val: number) => string | number;

export interface PropsType {
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 最小值
   * @default 0
   */
  min?: number;
  /**
   * 最大值
   * @default 100
   */
  max?: number;
  /**
   * 步长
   * @default 1
   */
  step?: number;
  /**
   * 是否显示间断点
   * @default false
   */
  showStops?: boolean;
  /**
   * 是否显示tooltip
   * @default true
   */
  showTooltip?: boolean;
  /**
   * 格式化 tooltip
   */
  formatTooltip?: (value: number) => string;
  /**
   * 是否为范围选择
   * @default false
   */
  range?: boolean;
  /**
   * 是否竖向模式
   * @default false
   */
  vertical?: boolean;
  /**
   * 是否只能拖动到步长的位置
   * @default false
   */
  onlySteps?: boolean;
  /**
   * 高度，用于调整轨道粗细
   * @default "medium"
   */
  height?: "thin" | "medium" | "thick";
  /**
   * 滑块尺寸，控制轨道粗细及按钮大小
   */
  size?: number;
  /**
   * 标记点
   */
  marks?: Record<number, string>;
}

export interface EmitsType {
  /**
   * 值变化时触发
   */
  (e: "change", value: number | number[]): void;
  /**
   * 数据改变时触发
   */
  (e: "input", value: number | number[]): void;
}

export interface ModelValueType {
  min: number;
  max: number;
}
