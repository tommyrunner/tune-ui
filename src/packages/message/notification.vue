<template>
  <Teleport :to="props.appendTo">
    <div :class="getMessageClass" v-bind="{ [MESSAGE_TAG]: MESSAGE_TAG }" :style="getMessageStyle" :id="id" ref="messageRef">
      <div class="_head">
        <span class="_title">
          <TIcon v-if="props.type !== 'info'" :icon="getIcon" :size="18" />
          {{ props.title }}
        </span>
        <TIcon v-if="props.isClose" icon="close" class="_icon-close" :size="14" @click="closeMessage" />
      </div>
      <div class="_content" v-html="props.content"></div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import "./notification.scss";
import type { PropsType, ExposesType } from "./types";
import type { IconTypes } from "@/packages/icon/icon";
import { computed, ref, StyleValue } from "vue";
import { TIcon } from "../icon";
import { MESSAGE_GAP, MESSAGE_TAG } from "./method";
import { notificationClass } from "./notificationCall";
import { fromCssVal } from "@/utils";
import { useMessage } from "./hooks";

/**
 * @description 通知组件
 */
defineOptions({ name: "TNotification" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  width: "340px",
  type: "info",
  messageType: "notice",
  appendTo: "body",
  position: "topRight",
  closeOnPressEscape: true,
  custom: () => ({
    x: "0px",
    y: `${MESSAGE_GAP}px`
  }),
  radius: () => [4, 4, 4, 4],
  padding: () => [12, 16, 12, 16],
  boxShadow: () => [0, 0, 4, "rgba(0, 0, 0, 0.5)"]
});

// 节点引用
const messageRef = ref();

// 处理基础事件
const { id, closeMessage } = useMessage(props, messageRef);

/**
 * @description 动态获取icon
 * @returns {IconTypes} 图标类型
 */
const getIcon = computed((): IconTypes => {
  const { type, icon } = props;
  // 优先指定
  if (icon) return icon;
  switch (type) {
    case "success":
      return "success-to";
    case "warning":
      return "illustrate";
    case "danger":
      return "close-to";
    default:
      return "help";
  }
});

/**
 * @description 动态设置class
 * @returns {string[]} 样式类名数组
 */
const getMessageClass = computed(() => {
  const { type, position } = props;
  return [notificationClass, `t-notification-type-${type}`, `t-notification-${position}`];
});

/**
 * @description 动态设置style样式
 * @returns {StyleValue} 样式对象
 */
const getMessageStyle = computed((): StyleValue => {
  const { padding = [], radius = [], position, custom, width } = props;
  // 处理上下初始化位置
  let customX = ["topLeft", "bottomLeft"].includes(position) ? "left" : "right";
  let customY = ["topRight", "topLeft"].includes(position) ? "top" : "bottom";
  return {
    width,
    padding: `${fromCssVal(padding)}`,
    borderRadius: `${fromCssVal(radius)}`,
    [customX]: custom.x,
    [customY]: custom.y
  };
});

defineExpose<ExposesType>({
  closeMessage
});
</script>
