<template>
  <Transition name="t-back-top">
    <div v-if="isShow" :class="backTopClasses" :style="backTopStyles" @click="handleClick">
      <slot>
        <t-icon :icon="props.icon" :size="props.iconSize" />
      </slot>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import "./index.scss";

import type { EmitsType, PropsType } from "./back-top";

import { computed, onMounted, onDeactivated, ref } from "vue";
import { TIcon } from "@/packages/icon";
import { isString } from "@/utils/is";

defineOptions({ name: "TBackTop" });

const props = withDefaults(defineProps<PropsType>(), {
  icon: "caret-up",
  bottom: "32px",
  right: "32px",
  iconSize: 32,
  visibilityHeight: 200
});

const emit = defineEmits<EmitsType>();
const isShow = ref(false);

/**
 * @description 获取目标元素
 * @returns {HTMLElement | null} 目标DOM元素
 */
const getTarget = (): HTMLElement | null => {
  return isString(props.target) ? document.querySelector(props.target) : props.target;
};

/**
 * @description 获取滚动元素
 * @returns {HTMLElement | Window} 滚动容器元素
 */
const scrollElement = computed((): HTMLElement | Window => {
  const target = getTarget();
  return target || window;
});

/**
 * @description 处理滚动事件
 * @returns {void}
 */
const handleScroll = (): void => {
  const { visibilityHeight } = props;
  const target = getTarget();

  // 默认使用 window
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight;
  let clientHeight = window.innerHeight;

  // 如果是指定元素
  if (target) {
    scrollTop = target.scrollTop;
    scrollHeight = target.scrollHeight;
    clientHeight = target.clientHeight;
  }

  // 判断是否显示按钮
  isShow.value = scrollTop + clientHeight >= scrollHeight - visibilityHeight;
};

/**
 * @description 处理点击事件
 * @returns {void}
 */
const handleClick = (): void => {
  scrollElement.value.scrollTo({ top: 0, behavior: "smooth" });
  emit("click");
};

/**
 * @description 计算组件类名
 * @returns {string[]} 类名数组
 */
const backTopClasses = computed((): string[] => {
  return ["t-back-top", props.plain && "t-back-top-plain"];
});

/**
 * @description 计算组件样式
 * @returns {object} 样式对象
 */
const backTopStyles = computed(() => {
  const { bottom, right } = props;
  return { bottom, right };
});

// 生命周期钩子
onMounted(() => scrollElement.value.addEventListener("scroll", handleScroll));
onDeactivated(() => scrollElement.value.removeEventListener("scroll", handleScroll));
</script>
