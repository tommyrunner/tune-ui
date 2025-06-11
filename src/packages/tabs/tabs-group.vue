<template>
  <div :class="groupClasses" :style="groupStyles">
    <div class="_action" :style="actionStyles"></div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import "./group.scss";
import type { PropsType, EmitsType, ExposesType } from "./tabs-group";
import type { ValueType } from "./tabs";
import type { GroupContextType } from "./constants";
import type { StyleValue } from "vue";
import { provide, reactive, toRefs, computed, nextTick, onMounted, onDeactivated, watch } from "vue";
import { tabsGroupKey } from "./constants";

defineOptions({ name: "TTabsGroup" });

/** 内边距常量 */
const PADDING = 4;

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  height: "42px",
  type: "line",
  gap: 8,
  actionDuration: 220
});

/**
 * @description v-model定义
 */
const model = defineModel<ValueType>();

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/** 组件状态管理 */
const state = reactive({
  isChange: false,
  childEl: void 0 as HTMLElement,
  actionPosition: {
    width: 20,
    left: 0,
    top: 0
  }
});

/**
 * 监听参数变化调整action位置
 */
watch(
  () => props,
  () => updateAction(),
  { deep: true }
);

/**
 * 计算group样式类名
 * @returns {string[]} 样式类名数组
 */
const groupClasses = computed((): string[] => {
  const { type } = props;
  return ["t-tabs-group", `t-tabs-type-${type}`];
});

/**
 * 计算group样式
 * @returns {StyleValue} 样式对象
 */
const groupStyles = computed((): StyleValue => {
  const { height, gap, type } = props;
  const isBorder = type === "border";
  return {
    height,
    padding: `0px ${isBorder ? 0 : PADDING}px`,
    gap: `${gap}px`
  };
});

/**
 * 计算action样式
 * @returns {StyleValue} action样式对象
 */
const actionStyles = computed((): StyleValue => {
  const { left, width } = state.actionPosition;
  return {
    transform: `translateX(${state.isChange ? left : -(width + PADDING)}px)`,
    width: `${width}px`,
    transition: `${props.actionDuration / 1000}s`
  };
});

/**
 * 修改选中状态
 * @param {HTMLElement} childEl - 子元素
 * @param {ValueType} value - 选中值
 * @param {boolean} isChange - 是否改变状态
 * @param {boolean} isEmit - 是否触发事件
 */
const handleChange = (childEl: HTMLElement, value?: ValueType, isChange?: boolean, isEmit = true) => {
  if (!childEl) return;
  nextTick(() => {
    const { offsetLeft, offsetWidth } = childEl;
    state.actionPosition.left = offsetLeft;
    if (props.type !== "border") state.actionPosition.left -= PADDING;
    state.actionPosition.width = offsetWidth;
    model.value = value;
    state.isChange = isChange;
    if (state.childEl !== childEl) state.childEl = childEl;
    if (isEmit) emit("change", model.value);
  });
};

/**
 * 更新action位置
 */
const updateAction = () => {
  if (state.childEl) {
    handleChange(state.childEl, model.value, true, false);
  }
};

/**
 * 组件挂载后的初始化
 */
onMounted(() => {
  window.addEventListener("resize", updateAction);
  window.addEventListener("transitionend", updateAction);
});

/**
 * 组件失活时的清理
 */
onDeactivated(() => {
  window.removeEventListener("resize", updateAction);
  window.removeEventListener("transitionend", updateAction);
});

/** 向子组件提供上下文数据 */
provide<GroupContextType>(
  tabsGroupKey,
  reactive({
    ...toRefs(props),
    model,
    changeEvent: handleChange,
    handleClose: (value?: ValueType) => {
      emit("close", value);
      nextTick(() => updateAction());
    }
  })
);

/**
 * 组件暴露的方法
 */
defineExpose<ExposesType>({
  updateAction
});
</script>
