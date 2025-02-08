import type { BaseProps } from "@/types";
import type { IconTypes } from "@/packages/icon/icon";

/** 值类型定义 */
export type ValueType = string | number | boolean | object;

/**
 * Radio组件的Props类型定义
 */
export interface PropsType extends BaseProps {
  /** 选中图形样式 */
  radius?: "default" | "square";

  /** 绑定对象类型的标记key */
  objKey?: string;

  /** 是否禁用 */
  disabled?: boolean;

  /** 原生name属性 */
  name?: string;

  /** 选中值 */
  value?: ValueType;

  /** 自定义图标类型 */
  icon?: IconTypes;
}

/**
 * Radio组件的事件类型定义
 */
export interface EmitsType {
  /** 选择改变事件 */
  (e: "change", data?: ValueType): void;
}
