import type { IconTypes } from "../icon/icon";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 阴影触发
  shadow?: "always" | "hover" | "never";
  // 标题
  title?: string;
  // icon
  titleIcon?: IconTypes;
}
