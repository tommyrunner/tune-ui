// 类型导出
export type TMessageType = InstanceType<typeof Message>;
export type TNotificationType = InstanceType<typeof Notification>;

// 组件导入
import Message from "./message.vue";
import Notification from "./notification.vue";
import MessageCall from "./messageCall";
import NotificationCall from "./notificationCall";

// 导出组件
export const TMessage = MessageCall;
export const TNotification = NotificationCall;
export { Message, Notification };
