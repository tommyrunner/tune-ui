/**
 * @description 滑块尺寸类型
 */
export type SliderSizeType = "large" | "default" | "small";

/**
 * @description 滑块位置类型
 */
export type SliderPlacementType = "top" | "right" | "bottom" | "left";

/**
 * @description 标记对象类型
 * @interface MarkObject
 * @property {Record<string, string>} style - 自定义样式
 * @property {string} label - 标记文本
 */
export interface MarkObject {
  style?: Record<string, string>;
  label: string;
}

/**
 * @description 标记类型
 */
export type MarksType = Record<number, string | MarkObject>;

/**
 * @description 滑块属性接口
 */
export interface SliderPropsType {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 步长 */
  step?: number;
  /** 滚动条大小 */
  size?: number;
  /** 是否显示间断点 */
  showStops?: boolean;
  /** 是否显示提示信息 */
  showTooltip?: boolean;
  /** 格式化提示信息的函数 */
  formatTooltip?: (val: number) => string;
  /** 是否开启选择范围 */
  range?: boolean;
  /** 是否为垂直模式 */
  vertical?: boolean;
  /** 滑块高度，垂直模式必填 */
  height?: string;
  /** tooltip 的自定义类名 */
  tooltipClass?: string;
  /** Tooltip 出现的位置 */
  placement?: SliderPlacementType;
  /** 标记 */
  marks?: MarksType;
  /** 输入框去抖动延迟，毫秒 */
  debounce?: number;
  /** 状态类型 */
  status?: "success" | "exception" | "warning";
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  /** 滑块值变化事件 */
  (e: "change", value: number | number[]): void;
  /** 滑块值输入事件 */
  (e: "input", value: number | number[]): void;
}
/**
 * @description 滑块内部状态类型
 */
export interface SliderStateType {
  /** 是否正在拖动 */
  dragging: boolean;
  /** 当前值 */
  currentValue: number | number[];
  /** Tooltip显示标志 */
  tooltipVisible: boolean[];
}

/**
 * @description 滑块上下文类型
 * @extends SliderProps
 */
export interface SliderContextType extends Omit<SliderPropsType, "modelValue"> {
  /** 滑块状态对象 */
  sliderState: SliderStateType;
}
