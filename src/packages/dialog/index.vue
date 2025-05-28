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

const { TEXT_CONFIRM, TEXT_CANCEL } = useI18nText(props);
const emit = defineEmits<EmitsType>();
const visible = defineModel<boolean>();
const popoverRef = ref<InstanceType<typeof TPopover>>();

const state = reactive({
  custom: { x: undefined, y: undefined }
});

// 注册拖动hooks事件
const { injectDrag } = useDraggable();
/**
 * 更新位置
 */
const updatePosition = () => {
  const { offset } = props;
  const top = document.documentElement.scrollTop;
  const left = document.documentElement.scrollLeft;
  state.custom = {
    x: window.innerWidth / 2 + left + offset.x,
    y: window.innerHeight / 2 + top + offset.y
  };
  popoverRef.value?.updateView();
};
// onMounted(updatePosition);

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
 * 处理打开事件
 */
const handleOpen = () => {
  emit("open");
  updatePosition();
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
