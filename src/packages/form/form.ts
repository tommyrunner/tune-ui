import type { BaseProps } from "@/types";

/**
 * @description 表单项校验状态
 */
export type FormItemValidateState = "" | "error" | "success" | "validating";

/**
 * @description 表单项校验触发方式
 */
export type FormItemTrigger = "blur" | "change" | "submit";

/**
 * @description 表单校验规则类型
 */
export interface FormItemRule {
  /** 是否必填 */
  required?: boolean;
  /** 错误消息 */
  message?: string;
  /** 校验触发方式 */
  trigger?: FormItemTrigger | FormItemTrigger[];
  /** 最小长度 */
  min?: number;
  /** 最大长度 */
  max?: number;
  /** 自定义校验方法 */
  validator?: (value: any) => boolean | Promise<boolean> | string | Promise<string>;
  /** 自定义正则校验 */
  pattern?: RegExp;
}

/**
 * @description 表单校验结果类型
 */
export type FormValidateResult = Promise<boolean>;

/**
 * @description 表单校验回调函数类型
 */
export type FormValidateCallback = (isValid: boolean, invalidFields?: Record<string, any>) => void;

/**
 * @description 表单状态类型
 */
export interface FormStateType {
  /** 表单项实例数组 */
  fields: FormItemInstance[];
  /** 是否正在提交 */
  submitting: boolean;
}

/**
 * @description 表单Props类型定义
 */
export interface FormPropsType {
  /** 表单数据对象 */
  model: Record<string, any>;
  /** 表单验证规则 */
  rules?: Record<string, FormItemRule[]>;
  /** 标签的位置 */
  labelPosition?: "right" | "left" | "top";
  /** 标签的宽度 */
  labelWidth?: string | number;
  /** 是否为行内表单 */
  inline?: boolean;
  /** 是否禁用表单 */
  disabled?: boolean;
  /** 是否隐藏必填星号 */
  hideRequiredAsterisk?: boolean;
  /** 是否显示校验错误信息 */
  showMessage?: boolean;
  /** 是否以行内形式展示校验信息 */
  inlineMessage?: boolean;
  /** 是否在提交时滚动到错误位置 */
  scrollToError?: boolean;
  /** 提交按钮文本 */
  submitText?: string;
  /** 重置按钮文本 */
  resetText?: string;
  /** 是否显示默认的底部按钮 */
  showDefaultFooter?: boolean;
  /** 提交回调 */
  onSubmit?: () => void | Promise<void>;
  /** 重置回调 */
  onReset?: () => void;
}

/**
 * @description 表单项组件Props类型
 */
export interface FormItemPropsType extends BaseProps {
  /** 标签文本 */
  label?: string;
  /** 表单域标签的宽度 */
  labelWidth?: string | number;
  /** 表单域字段名 */
  prop?: string;
  /** 表单域验证规则 */
  rules?: FormItemRule | FormItemRule[];
  /** 是否必填，如不设置，则会根据校验规则自动生成 */
  required?: boolean;
  /** 表单域验证错误信息 */
  error?: string;
  /** 是否显示校验错误信息 */
  showMessage?: boolean;
  /** 是否在行内显示校验信息 */
  inlineMessage?: boolean;
  /** 表单验证状态 */
  validateStatus?: FormItemValidateState;
}

/**
 * @description 表单项状态类型
 */
export interface FormItemStateType {
  /** 验证状态 */
  validateState: FormItemValidateState;
  /** 验证消息 */
  validateMessage: string;
  /** 是否正在校验 */
  isValidating: boolean;
  /** 输入元素ID数组 */
  inputIds: string[];
  /** 初始值 */
  initialValue: any;
}

/**
 * @description 表单上下文类型
 */
export interface FormContextType extends Omit<FormPropsType, "onSubmit" | "onReset"> {
  /** 校验表单 */
  validate: (callback?: FormValidateCallback) => FormValidateResult;
  /** 校验特定表单字段 */
  validateField: (props: string | string[], callback?: FormValidateCallback) => FormValidateResult;
  /** 重置表单 */
  resetFields: () => void;
  /** 清除校验 */
  clearValidate: (props?: string | string[]) => void;
  /** 添加表单项实例 */
  addField: (field: FormItemInstance) => void;
  /** 移除表单项实例 */
  removeField: (field: FormItemInstance) => void;
}

/**
 * @description 表单项实例接口
 */
export interface FormItemInstance {
  /** 属性名 */
  prop: string;
  /** 验证状态 */
  validateState: FormItemValidateState;
  /** 验证方法 */
  validate: (trigger?: string) => FormValidateResult;
  /** 重置表单项 */
  resetField: () => void;
  /** 清除校验 */
  clearValidate: () => void;
}
