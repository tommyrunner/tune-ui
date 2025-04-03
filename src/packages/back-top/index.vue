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
 * 获取目标元素
 */
const getTarget = (): HTMLElement | null => {
  return isString(props.target) ? document.querySelector(props.target) : props.target;
};

/**
 * 获取滚动元素
 */
const scrollElement = computed(() => {
  const target = getTarget();
  return target || window;
});

/**
 * 处理滚动事件
 */
const handleScroll = () => {
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
 * 处理点击事件
 */
const handleClick = () => {
  scrollElement.value.scrollTo({ top: 0, behavior: "smooth" });
  emit("click");
};

/**
 * 计算组件类名
 */
const backTopClasses = computed(() => {
  return ["t-back-top", props.plain && "t-back-top-plain"];
});

/**
 * 计算组件样式
 */
const backTopStyles = computed(() => {
  const { bottom, right } = props;
  return { bottom, right };
});

// 生命周期钩子
onMounted(() => scrollElement.value.addEventListener("scroll", handleScroll));
onDeactivated(() => scrollElement.value.removeEventListener("scroll", handleScroll));
</script>
