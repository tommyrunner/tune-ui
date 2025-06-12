import type { BaseProps } from "@/types";
import type { IconTypes } from "@/packages/icon/icon";

/**
 * @description 值类型定义
 * @typedef {string | number | boolean | object} ValueType
 */
export type ValueType = string | number | boolean | object;

/**
 * @description Radio组件的Props类型定义
 * @interface PropsType
 * @extends {BaseProps}
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
 * @description Radio组件的事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 选择改变事件 */
  change: [ValueType];
}

/**
 * @description Radio组件的插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 单选框文本内容 */
  default?: () => any;
  /** 自定义选中图标插槽 */
  radioSpan?: (params: { value: ValueType }) => any;
}

/**
 * @description Radio组件暴露方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 触发选中状态切换 */
  toggle: () => void;
}
