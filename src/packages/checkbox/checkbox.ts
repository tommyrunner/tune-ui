import { type BaseProps } from "@/types";
import { IconTypes } from "@/packages/icon/icon";
/**
 * value 类型
 */
export type ValueType = string | number | boolean | object;
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  // 选中图形样式
  radius?: "default" | "square";
  // 绑定对象类型的标记key
  objKey?: string;
  // 是否禁用
  disabled?: boolean;
  // 原生name值
  name?: string;
  // 状态值
  value?: ValueType;
  // 自定义图表图形
  icon?: IconTypes;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 选择事件
  (e: "change", data?: ValueType): void;
}
