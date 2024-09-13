import { ValueType } from "./collapse";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 手风琴模式
  accordion?: boolean;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: "change", data?: ValueType[]): void;
}
