<template>
  <t-popover
    :position="props.position"
    type="click"
    v-model="visible"
    :disabled="props.disabled"
    :close-on-press-escape="props.closeOnPressEscape"
    :close-on-press-other="props.closeOnPressOther"
    :padding="props.padding"
    :box-shadow="props.boxShadow"
  >
    <template #content>
      <div class="t-pop-confirm" :style="confirmStyles">
        <slot name="content">
          <div class="_head">
            <t-icon v-if="props.icon" :icon="props.icon" :color="props.iconColor" :size="14" />
            <span>{{ props.content }}</span>
          </div>
        </slot>
        <div class="_btn">
          <t-button :type="props.cancelType" size="small" @click="handleCancel">
            {{ props.cancelText }}
          </t-button>
          <t-button :type="props.confirmType" size="small" @click="handleConfirm">
            {{ props.confirmText }}
          </t-button>
        </div>
      </div>
    </template>
    <slot />
  </t-popover>
</template>

<script lang="ts" setup>
import type { PropsType, EmitsType } from "./pop-confirm";
import type { StyleValue } from "vue";
import { computed } from "vue";
import { TPopover } from "@/packages/popover";
import { TButton } from "@/packages/button";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TPopConfirm" });

/** Props定义 */
const props = withDefaults(defineProps<PropsType>(), {
  icon: "illustrate",
  iconColor: "#999",
  confirmText: "确认",
  confirmType: "text",
  cancelText: "取消",
  cancelType: "text",
  position: "top",
  padding: () => [8, 6, 8, 6],
  closeOnPressOther: false
});

/** Emits定义 */
const emit = defineEmits<EmitsType>();

/** 双向绑定 */
const visible = defineModel<boolean>();

/**
 * 处理确认按钮点击
 */
const handleConfirm = () => {
  emit("confirm");
  visible.value = false;
};

/**
 * 处理取消按钮点击
 */
const handleCancel = () => {
  emit("cancel");
  visible.value = false;
};

/**
 * 计算确认框样式
 */
const confirmStyles = computed((): StyleValue => {
  const { maxWidth } = props;
  return {
    maxWidth
  };
});
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
