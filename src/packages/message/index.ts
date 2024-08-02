// 触发器
import MessageCall from './messageCall'
// 组件
import Message from './message.vue'
import NotificationCall from './notificationCall'
import Notification from './notification.vue'
// 导出组件
const TMessage = MessageCall
const TNotification = NotificationCall
// 可通过js触发，所以T主要的使用在于call，组件为次要
export { Message, TMessage, Notification, TNotification }
// 导出组件类型
export type TMessageType = InstanceType<typeof Message>
export type TNotificationType = InstanceType<typeof Notification>
