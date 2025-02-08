import type { IconTypes } from "@/packages/icon/icon";
import type { RendererElement } from "vue";

/**
 * Message组件的Props类型定义
 */
export interface PropsType {
  /** 消息框宽度 */
  width?: string;

  /** 消息类型 */
  type?: "success" | "warning" | "info" | "danger";

  /** 是否使用plain样式 */
  plain?: boolean;

  /** 消息展示方式 */
  messageType?: "default" | "notice";

  /** 标题(notification可用) */
  title?: string;

  /** 方向(notification可用) */
  position?: "topRight" | "bottomRight" | "bottomLeft" | "topLeft";

  /** 消息内容 */
  content?: string;

  /** 图标类型 */
  icon?: IconTypes;

  /** 显示时间(毫秒), 0表示不自动关闭 */
  duration?: number;

  /** 圆角大小 */
  radius?: [number, number, number, number] | number;

  /** 内边距大小 */
  padding?: [number, number, number, number] | number;

  /** 消息渲染的目标位置 */
  appendTo?: string | RendererElement;

  /** 自定义位置坐标 */
  custom?: {
    x: string;
    y: string;
  };

  /** 最大消息数量 */
  maxLength?: number;

  /** 是否显示关闭按钮 */
  isClose?: boolean;

  /** 关闭回调函数 */
  closeCallback?: (id: string) => void;

  /** 是否支持ESC键关闭 */
  closeOnPressEscape?: boolean;
}

/**
 * Tooltip钩子参数类型
 */
export interface TooltipHookParamsType {
  type: PropsType["type"];
}
