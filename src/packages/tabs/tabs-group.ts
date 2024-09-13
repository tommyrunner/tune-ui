import { ValueType } from "./tabs";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 类型
  type?: "line" | "block" | "border";
  // 高度
  height?: string;
  // 间距(为0充满父元素)
  gap?: number;
  // 是否开启关闭
  isClose?: boolean;
  // action动画时间(毫秒)
  actionDuration?: number;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: "change", data?: ValueType): void;
  (e: "close", data?: ValueType): void;
}
