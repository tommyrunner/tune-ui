import type { IconTypes } from "../icon/icon";
/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 标题
  title?: string;
  // icon
  rightIcon?: IconTypes;
  disabled?: boolean;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {}
