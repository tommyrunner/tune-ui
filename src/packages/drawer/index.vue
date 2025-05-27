<template>
  <TPopover
    type="none"
    :position="props.position"
    :width="isSide ? props.size : '100%'"
    v-model="visible"
    :close-on-press-escape="props.closeOnPressEscape"
    :close-on-press-other="!props.isModal && props.closeOnPressModel"
    :padding="props.padding"
    :box-shadow="props.boxShadow"
    :custom="state.custom"
    :drawer-animation="true"
    :show-arrow="false"
    :is-modal="props.isModal"
    :is-modal-nest="true"
    :radius="[0, 0, 0, 0]"
    @click-model="handleClickModel"
    @open="handleOpen"
    @close="emit('close')"
    ref="popoverRef"
  >
    <template #content>
      <div class="t-drawer" :style="drawerStyle">
        <div class="_head">
          <slot name="title">
            <div class="_title">
              <TIcon :icon="props.icon" :size="18" v-if="props.icon" />
              <span class="_title">{{ props.title }}</span>
            </div>
          </slot>
          <TIcon icon="close" :size="14" @click="handleSubmit(false)" v-if="props.isCloseIcon" />
        </div>
        <div class="content">
          <slot />
        </div>
        <div class="_foot" :style="footStyle" v-if="props.isFoot">
          <slot name="footer">
            <div class="_btn">
              <TButton :type="props.cancelType" @click="handleSubmit(true)">{{ TEXT_CANCEL }}</TButton>
              <TButton :type="props.confirmType" @click="handleSubmit(false)">
                {{ TEXT_CONFIRM }}
              </TButton>
            </div>
          </slot>
        </div>
      </div>
    </template>
  </TPopover>
</template>
<script lang="ts" setup>
import "./index.scss";
import type { StyleValue } from "vue";
import type { PropsType, EmitsType } from "./drawer";
import { TPopover } from "../popover";
import { TButton } from "../button";
import { TIcon } from "../icon";
import { computed, onMounted, reactive, ref } from "vue";
import { useI18nText } from "./i18n";
defineOptions({ name: "TDrawer" });
const emit = defineEmits<EmitsType>();
const GAP = 4;
const state = reactive({
  custom: { x: 0, y: 0 }
});
const props = withDefaults(defineProps<PropsType>(), {
  position: "left",
  size: "600px",
  icon: "inspiration",
  confirmType: "primary",
  cancelType: "default",
  btnAlign: "flex-end",
  closeOnPressEscape: true,
  closeOnPressModel: true,
  isModal: true,
  isFoot: true,
  isCloseIcon: true,
  isSetMaxHeight: true,
  padding: () => [12, 16, 12, 16],
  offset: () => ({ x: 0, y: 0 })
});
const { TEXT_CONFIRM, TEXT_CANCEL } = useI18nText(props);
const visible = defineModel<boolean>();
const popoverRef = ref<InstanceType<typeof TPopover>>();
/**
 * 判断是否是两侧方向
 */
const isSide = computed(() => {
  return ["left", "right"].includes(props.position);
});
/**
 * 更新位置
 */
const updatePosition = () => {
  const { offset } = props;
  const top = document.documentElement.scrollTop;
  const left = document.documentElement.scrollLeft;
  state.custom = {
    x: left + offset.x,
    y: top + offset.y
  };
  // 右侧需要计算(样式已经 设置了right:0，所以需要去掉x的计算值)
  if (["right"].includes(props.position)) state.custom.x = undefined;
  // 底部需要计算(因为计算坐标是top的，所以需要减去高度)
  if (["bottom"].includes(props.position)) state.custom.y += window.innerHeight - popoverRef.value.popoverRef.offsetHeight;
  popoverRef.value?.updateView();
};
onMounted(updatePosition);

/**
 * 打开
 */
const handleOpen = () => {
  emit("open");
  updatePosition();
};

const handleSubmit = (isConfirm: boolean) => {
  if (isConfirm) {
    emit("confirm");
  } else {
    emit("cancel");
  }
  visible.value = false;
};
const handleClickModel = () => {
  if (props.closeOnPressModel) {
    handleSubmit(false);
  }
};
const drawerStyle = computed((): StyleValue => {
  const { size, isSetMaxHeight } = props;
  let sizeKey = "width";
  let maxKey = "height";
  // 高度需要计算
  let maxScreen = `${window.innerHeight - props.padding[0] * 2 - GAP}px`;
  // 设置上下
  if (!isSide.value) {
    sizeKey = "height";
    maxKey = "width";
    maxScreen = "100%";
  }
  return {
    [sizeKey]: isSide.value ? "100%" : size,
    // isSetMaxScreen 控制是否占全高(只适用于 left|right)
    [maxKey]: isSetMaxHeight ? maxScreen : "auto"
  };
});
const footStyle = computed((): StyleValue => {
  return {
    justifyContent: props.btnAlign
  };
});
</script>
