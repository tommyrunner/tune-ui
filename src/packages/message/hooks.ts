import type { PropsType } from "./types";
import type { Ref } from "vue";
import { onDeactivated, onMounted, reactive, toRefs } from "vue";
import { messageClass } from "./messageCall";
import { notificationClass } from "./notificationCall";
import { generateId, isDownKeyboard } from "@/utils";
import { messageVNodeAll, isNotification } from "./method";
import { isFunction } from "@/utils/is";
/**
 * 统一处理message基础事件hooks
 * @param props - Message组件的props参数
 * @param messageRef - Message组件的DOM节点引用
 * @returns 返回message相关的状态和方法
 */
export function useMessage(props: PropsType, messageRef: Ref<HTMLElement>) {
  const { messageType, closeOnPressEscape } = props;
  const className = isNotification(messageType) ? notificationClass : messageClass;
  const state = reactive({
    id: className
  });
  // 初始化事件
  onMounted(() => {
    state.id = `${className}-${generateId()}`;
    window.addEventListener("keydown", keydownHandler);
  });
  onDeactivated(() => {
    window.removeEventListener("keydown", keydownHandler);
  });
  /**
   * 处理message按下esc关闭事件
   */
  const keydownHandler = (event: KeyboardEvent) => {
    if (closeOnPressEscape && isDownKeyboard(event, "escape")) {
      messageVNodeAll[messageVNodeAll.length - 1].closeMessage();
    }
  };
  /**
   * 处理关闭message组件
   * @returns
   */
  const closeMessage = () => {
    if (!messageRef.value) return;
    if (isNotification(messageType)) {
      messageRef.value.classList.add(`t-notification-${props.position}-close`);
      messageRef.value.addEventListener("animationend", removeElement);
    } else {
      messageRef.value.classList.add("t-message-close");
      messageRef.value.addEventListener("animationend", removeElement);
    }
  };
  /**
   * 处理销毁删除message事件
   * @param event
   */
  const removeElement = function (event: MouseEvent) {
    const { closeCallback } = props;
    const element = event.target as HTMLElement;
    element.remove(); // 从DOM中移除元素
    // 移除事件监听器
    element.removeEventListener("animationend", removeElement);
    messageVNodeAll.pop();
    if (closeCallback && isFunction(closeCallback)) closeCallback(state.id);
  };
  return {
    ...toRefs(state),
    closeMessage,
    removeElement
  };
}
