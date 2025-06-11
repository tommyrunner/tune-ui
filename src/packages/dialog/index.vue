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
    @open="handleOpen"
    @close="emit('close')"
    ref="popoverRef"
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
          <slot name="footer">
            <div class="_btn">
              <TButton :type="cancelType" @click="handleSubmit(false)">{{ TEXT_CANCEL }}</TButton>
              <TButton :type="confirmType" @click="handleSubmit(true)">{{ TEXT_CONFIRM }}</TButton>
            </div>
          </slot>
        </div>
      </div>
    </template>
  </TPopover>
</template>

<script lang="ts" setup>
import "./index.scss";

import type { PropsType, EmitsType } from "./dialog";
import type { StyleValue } from "vue";

import { computed, reactive, ref } from "vue";
import { useDraggable } from "@/hooks/useDraggable";
import { TPopover } from "@/packages/popover";
import { TButton } from "@/packages/button";
import { TIcon } from "@/packages/icon";
import { useI18nText } from "./i18n";

defineOptions({ name: "TDialog" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  width: "600px",
  icon: "inspiration",
  confirmType: "success",
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

/**
 * @description 国际化文本
 */
const { TEXT_CONFIRM, TEXT_CANCEL } = useI18nText(props);

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description v-model定义
 */
const visible = defineModel<boolean>();

/**
 * @description DOM引用
 */
const popoverRef = ref<InstanceType<typeof TPopover>>();

/**
 * @description 组件状态
 */
const state = reactive({
  custom: { x: undefined, y: undefined }
});

/**
 * @description 注册拖动hooks事件
 */
const { injectDrag } = useDraggable();

/**
 * @description 更新位置
 * @returns {void}
 */
const updatePosition = (): void => {
  const { offset } = props;
  const top = document.documentElement.scrollTop;
  const left = document.documentElement.scrollLeft;
  state.custom = {
    x: window.innerWidth / 2 + left + offset.x,
    y: window.innerHeight / 2 + top + offset.y
  };
  popoverRef.value?.updateView();
};

/**
 * @description 处理提交事件
 * @param {boolean} isConfirm - 是否为确认操作
 * @returns {void}
 */
const handleSubmit = (isConfirm: boolean): void => {
  if (isConfirm) {
    emit("confirm");
  } else {
    emit("cancel");
  }
  visible.value = false;
};

/**
 * @description 处理打开事件
 * @returns {void}
 */
const handleOpen = (): void => {
  emit("open");
  updatePosition();
};

/**
 * @description 处理遮罩层点击
 * @returns {void}
 */
const handleClickModel = (): void => {
  if (props.closeOnPressModel) {
    handleSubmit(false);
  }
};

/**
 * @description 处理拖动
 * @param {HTMLElement} el - DOM元素
 * @returns {void}
 */
const handleDrag = (el: HTMLElement): void => {
  injectDrag(el, "._head-draggable");
};

/**
 * @description 计算底部样式
 * @returns {StyleValue} 样式对象
 */
const footStyle = computed((): StyleValue => {
  return {
    justifyContent: props.btnAlign
  };
});
</script>
