import type { ExtractPropTypes } from "vue";
import type { FormItemTrigger, FormItemRule, FormValidateResult } from "../../form";

/**
 * @description 表单项验证状态
 * @typedef {"" | "error" | "validating" | "success"} FormItemValidateState
 */
export type FormItemValidateState = "" | "error" | "validating" | "success";

/**
 * @description 表单项状态类型
 * @interface FormItemState
 */
export interface FormItemState {
  validateState: FormItemValidateState;
  validateMessage: string;
  isValidating: boolean;
  initialValue: any;
}

/**
 * @description 表单项Props类型
 * @interface FormItemPropsType
 */
export interface FormItemPropsType {
  /** 标签文本 */
  label?: string;
  /** 标签宽度，支持数字和CSS宽度单位 */
  labelWidth?: string | number;
  /** 表单域 model 字段名 */
  prop?: string;
  /** 是否必填 */
  required?: boolean;
  /** 表单验证规则 */
  rules?: FormItemRule | FormItemRule[];
  /** 验证触发方式 */
  validateTrigger?: FormItemTrigger | FormItemTrigger[];
  /** 是否显示错误信息 */
  showMessage?: boolean;
  /** 是否行内显示错误信息 */
  inlineMessage?: boolean;
  /** 表单项尺寸 */
  size?: "large" | "default" | "small";
  /** 验证状态 */
  validateStatus?: FormItemValidateState;
  /** 字段提示信息 */
  tip?: string;
}

/**
 * @description 表单项事件类型定义
 * @interface FormItemEmitsType
 */
export interface FormItemEmitsType {
  /** 验证状态变更事件 */
  validate: [string, boolean, string?];
}

/**
 * @description 表单项插槽类型定义
 * @interface FormItemSlotsType
 */
export interface FormItemSlotsType {
  /** 默认插槽 - 表单项内容 */
  default?: () => any;
  /** 标签插槽 */
  label?: () => any;
  /** 错误提示插槽 */
  error?: (params: { error: string }) => any;
}

/**
 * @description 表单项暴露方法类型定义
 * @interface FormItemExposesType
 */
export interface FormItemExposesType {
  /** 验证方法 */
  validate: (trigger?: FormItemTrigger) => FormValidateResult;
  /** 重置表单项 */
  resetField: () => void;
  /** 清除验证状态 */
  clearValidate: () => void;
  /** 表单项标识 */
  prop: string;
  /** 验证状态 */
  validateState: FormItemValidateState;
}

/**
 * @description 表单项上下文类型
 * @interface FormItemContextType
 */
export interface FormItemContextType {
  /** 标识 */
  id: string;
  /** 验证状态 */
  validateState: FormItemValidateState;
  /** 验证消息 */
  validateMessage: string;
  /** 验证方法 */
  validate: (trigger?: FormItemTrigger) => Promise<void>;
  /** 重置验证状态 */
  resetField: () => void;
  /** 清除验证状态 */
  clearValidate: () => void;
}

/**
 * @description 表单项Props
 * @typedef {ExtractPropTypes<FormItemPropsType>} FormItemProps
 */
export type FormItemProps = ExtractPropTypes<FormItemPropsType>;
