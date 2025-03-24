<template>
  <TPopover
    position="top"
    type="none"
    v-model="visible"
    :disabled="disabled"
    :close-on-press-escape="closeOnPressEscape"
    :close-on-press-other="closeOnPressModel"
    :padding="padding"
    :box-shadow="boxShadow"
    :custom="state.custom"
    :dialog-animation="true"
    :show-arrow="false"
    :is-modal="isModal"
    :is-modal-nest="isModal"
    :width="width"
    @click-model="handleClickModel"
    @hover-enter="handleDrag"
    @open="emit('open')"
    @close="emit('close')"
  >
    <template #content>
      <div class="t-dialog">
        <div :class="['_head', draggable && '_head-draggable']">
          <slot name="title">
            <div class="_title">
              <TIcon :icon="icon" :size="18" v-if="icon" />
              <span class="_title">{{ title }}</span>
            </div>
          </slot>
          <TIcon icon="close" :size="12" @click="handleSubmit(false)" v-if="isCloseIcon" />
        </div>
        <div class="content">
          <slot />
        </div>
        <div class="_foot" :style="footStyle" v-if="isFoot">
          <slot name="foot">
            <div class="_btn">
              <TButton :type="cancelType" @click="handleSubmit(false)">{{ cancelText }}</TButton>
              <TButton :type="confirmType" @click="handleSubmit(true)">{{ confirmText }}</TButton>
            </div>
          </slot>
        </div>
      </div>
    </template>
  </TPopover>
</template>

<script lang="ts" setup>
import type { PropsType, EmitsType } from "./dialog";
import type { StyleValue } from "vue";
import { computed, onMounted, reactive } from "vue";
import { useDraggable } from "@/hooks/useDraggable";
import { TPopover } from "@/packages/popover";
import { TButton } from "@/packages/button";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TDialog" });

const props = withDefaults(defineProps<PropsType>(), {
  width: "600px",
  icon: "inspiration",
  confirmText: "确认",
  confirmType: "success",
  cancelText: "取消",
  cancelType: "default",
  btnAlign: "flex-end",
  closeOnPressEscape: true,
  closeOnPressModel: true,
  isModal: true,
  isFoot: true,
  isCloseIcon: true,
  padding: () => [12, 16, 12, 16],
  offset: () => ({ x: 0, y: 0 })
});

const emit = defineEmits<EmitsType>();
const visible = defineModel<boolean>();

const state = reactive({
  custom: { x: 0, y: 0 }
});

// 注册拖动hooks事件
const { injectDrag } = useDraggable();

/**
 * 生命周期
 */
onMounted(() => {
  const { offset } = props;
  state.custom = {
    x: window.innerWidth / 2 + offset.x,
    y: window.innerHeight / 2 + offset.y
  };
});

/**
 * 处理提交事件
 */
const handleSubmit = (isConfirm: boolean) => {
  if (isConfirm) {
    emit("confirm");
  } else {
    emit("cancel");
  }
  visible.value = false;
};

/**
 * 处理遮罩层点击
 */
const handleClickModel = () => {
  if (props.closeOnPressModel) {
    handleSubmit(false);
  }
};

/**
 * 处理拖动
 */
const handleDrag = (el: HTMLElement) => {
  injectDrag(el, "._head-draggable");
};

/**
 * 计算底部样式
 */
const footStyle = computed((): StyleValue => {
  return {
    justifyContent: props.btnAlign
  };
});
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
