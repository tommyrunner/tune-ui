import type { ExtractPropTypes } from "vue";
import type { FormItemTrigger, FormItemRule } from "../../form";

/**
 * @description 表单项验证状态
 */
export type FormItemValidateState = "" | "error" | "validating" | "success";

// 表单项状态
export interface FormItemState {
  validateState: FormItemValidateState;
  validateMessage: string;
  isValidating: boolean;
  initialValue: any;
}

/**
 * @description 表单项Props类型
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
}

/**
 * @description 表单项Emit类型
 */
export interface FormItemEmitsType {
  /** 验证状态变更事件 */
  (e: "validate", prop: string, isValid: boolean, message?: string): void;
}

/**
 * @description 表单项上下文类型
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
 */
export type FormItemProps = ExtractPropTypes<FormItemPropsType>;
