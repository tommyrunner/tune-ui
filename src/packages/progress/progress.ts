/**
 * @description 进度条类型
 */
export type ProgressType = "line" | "circle" | "dashboard";

/**
 * @description 状态类型
 */
export type StatusType = "success" | "exception" | "warning";

/**
 * @description 颜色对象类型
 * @interface ColorObject
 */
export interface ColorObject {
  /** 颜色值 */
  color: string;
  /** 百分比临界值 */
  percentage: number;
}

/**
 * @description 颜色函数类型，接收百分比返回颜色值
 */
export type ColorFunction = (percentage: number) => string;

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 百分比值(必填) */
  percentage: number;
  /** 进度条类型 */
  type?: ProgressType;
  /** 进度条宽度 */
  strokeWidth?: number;
  /** 是否在进度条内显示文字 */
  textInside?: boolean;
  /** 进度条状态 */
  status?: StatusType;
  /** 是否为不确定进度条 */
  indeterminate?: boolean;
  /** 动画持续时间 */
  duration?: number;
  /** 进度条颜色 */
  color?: string | ColorFunction | ColorObject[];
  /** 环形进度条宽度 */
  width?: number;
  /** 是否显示进度文字 */
  showText?: boolean;
  /** 圆形进度条端点形状 */
  strokeLinecap?: "butt" | "round" | "square";
  /** 自定义文本格式 */
  format?: (percentage: number) => string;
  /** 是否有条纹 */
  striped?: boolean;
  /** 条纹是否流动 */
  stripedFlow?: boolean;
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 自定义进度文字内容 */
  default?: (props: { percentage: number }) => any;
}

/**
 * @description 进度条内部状态类型
 * @interface ProgressStateType
 */
export interface ProgressStateType {
  /** 计算后的颜色 */
  computedColor: string;
  /** 内部维护的百分比值，确保响应式 */
  percentage?: number;
  /** 动画ID */
  animationId?: number;
  /** 渐变ID */
  gradientId?: string;
}

/**
 * @description 进度条上下文类型
 * @interface ProgressContextType
 */
export interface ProgressContextType extends PropsType {
  /** 进度值 */
  percentage: number;
  /** 进度条状态对象 */
  progressState: ProgressStateType;
  /** 计算后的文本内容 */
  content?: string;
}
