// 触发器
import MessageCall from './messageCall'
// 组件
import Message from './message.vue'
import NotificationCall from './notificationCall'
import Notification from './notification.vue'
// 导出组件
export const TMessage = MessageCall
export const TNotification = NotificationCall
// 导出组件类型
export type TMessageType = InstanceType<typeof Message>
export type TNotificationType = InstanceType<typeof Notification>
