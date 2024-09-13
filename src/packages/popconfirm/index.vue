<template>
  <TPopover
    position="top"
    type="click"
    v-model="visible"
    :disabled="props.disabled"
    :close-on-press-escape="props.closeOnPressEscape"
    :close-on-press-other="props.closeOnPressOther"
    :padding="props.padding"
    :box-shadow="props.boxShadow"
  >
    <template #content>
      <div class="t-popConfirm" :style="getPopConfirmStyle">
        <slot name="content">
          <div class="_head">
            <TIcon :icon="props.icon" color="#fc9824" :size="14" v-if="props.icon" />
            <span>{{ props.content }}</span>
          </div>
        </slot>
        <div class="_btn">
          <TButton :type="props.cancelType" size="small" @click="handlerSubmit(true)">{{ props.cancelText }}</TButton>
          <TButton :type="props.confirmType" size="small" @click="handlerSubmit(false)">
            {{ props.confirmText }}
          </TButton>
        </div>
      </div>
    </template>
    <slot />
  </TPopover>
</template>
<script lang="ts" setup>
import type { PropsType, EmitsType } from "./popConfirm";
import { TPopover } from "../popover";
import { TButton } from "../button";
import { TIcon } from "../icon";
import { computed, StyleValue } from "vue";
defineOptions({ name: "TPopConfirm" });
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  icon: "illustrate",
  confirmText: "确认",
  confirmType: "text",
  cancelText: "取消",
  cancelType: "text",
  padding: () => [8, 6, 8, 6],
  closeOnPressOther: false
});
const visible = defineModel<boolean>();
const handlerSubmit = isConfirm => {
  if (isConfirm) emit("confirm");
  else emit("cancel");
  visible.value = false;
};
const getPopConfirmStyle = computed((): StyleValue => {
  const { maxWidth } = props;
  return {
    maxWidth: maxWidth
  };
});
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
