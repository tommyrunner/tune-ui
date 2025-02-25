import type { BaseProps } from "@/types";

/**
 * @description 日期类型
 */
export type DateType = Date | string | number;

/**
 * @description 日历模式
 */
export type ModeType = "date" | "month" | "year";

/**
 * @description 日历组件属性类型
 */
export interface PropsType extends BaseProps {
  /** 日历模式 */
  mode?: ModeType;
  /** 是否禁用 */
  disabled?: boolean;
  /** 不可选择的日期 */
  disabledDate?: (date: Date) => boolean;
}

/**
 * @description 组件事件类型
 */
export interface EmitsType {
  /** 日期变化 */
  (e: "change", value: DateType): void;
  /** 面板变化 */
  (e: "panel-change", mode: ModeType): void;
  /** 跳转到指定日期 */
  (e: "jump-to-date", date: Date): void;
}

// 常量定义
/** 星期标题 */
export const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"];
/** 月份名称 */
export const MONTH_NAMES = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
