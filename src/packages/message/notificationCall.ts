import type { PropsType } from "./types";
import { createMessage, initProps } from "./method";

export const notificationClass = `t-notification`;

/***************  快捷操作 ********************/
// 快捷message触发
function message(title: string, content: string, type?: PropsType["type"], config?: PropsType) {
  return createMessage(
    initProps(
      Object.assign(
        {
          title,
          content,
          type
        },
        config,
        { messageType: "notice" }
      )
    )
  );
}
export default {
  name: "TNotification",
  message,
  info: (title: string, content: string) => message(title, content, "info"),
  success: (title: string, content: string) => message(title, content, "success"),
  warning: (title: string, content: string) => message(title, content, "warning"),
  danger: (title: string, content: string) => message(title, content, "danger")
};
