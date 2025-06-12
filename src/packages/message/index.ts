/**
 * @module Message
 */
import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType, ExposesType } from "./types";
import Message from "./message.vue";
import Notification from "./notification.vue";
import MessageCall from "./messageCall";
import NotificationCall from "./notificationCall";

/**
 * @description message组件
 */
export const TMessage = MessageCall;

/**
 * @description notification组件
 */
export const TNotification = NotificationCall;

/**
 * @description message基础组件
 */
export const TMessageBase = Message as unknown as SFCWithInstall<PropsType, ExposesType, SlotsType, EmitsType>;

/**
 * @description notification基础组件
 */
export const TNotificationBase = Notification as unknown as SFCWithInstall<PropsType, ExposesType, SlotsType, EmitsType>;

/**
 * @description message类型
 */
export type TMessageType = InstanceType<typeof TMessageBase>;

/**
 * @description notification类型
 */
export type TNotificationType = InstanceType<typeof TNotificationBase>;
