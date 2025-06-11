<template>
  <div
    :class="carouselClasses"
    :style="carouselStyle"
    @mouseover="state.isHoverContent = true"
    @mouseout="state.isHoverContent = false"
  >
    <!-- 切换箭头 -->
    <t-icon :class="['_arrow', '_arrow-icon1', `_arrow-${props.arrow}`]" icon="left-circle" :size="32" @click="handlePrevClick" />
    <t-icon
      :class="['_arrow', '_arrow-icon2', `_arrow-${props.arrow}`]"
      icon="right-circle"
      :size="32"
      @click="handleNextClick"
    />

    <!-- 指示器 -->
    <div :class="triggerClasses" v-if="childEls.length && props.trigger !== 'none'">
      <div
        v-for="(_, index) in childLength"
        :key="index"
        :class="['_trigger-item', state.triggerActive === index && '_trigger-item-active']"
        @click="setPageIndex(index, 'click')"
        @mouseover="setPageIndex(index, 'hover')"
      ></div>
    </div>

    <!-- 内容区域 -->
    <div :class="contentClasses" ref="groupContent">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./group.scss";

import type { PropsType, EmitsType, ExposesType } from "./carousel-group";
import type { StyleValue } from "vue";

import { ref, reactive, onMounted, computed, onDeactivated, watch } from "vue";
import { AnimationFrame } from "@/utils";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TCarouselGroup" });

const props = withDefaults(defineProps<PropsType>(), {
  width: 300,
  height: 200,
  delay: 2200,
  initIndex: 0,
  pauseOnHover: true,
  direction: "horizontal",
  trigger: "hover",
  arrow: "hover",
  toggle: "vision"
});

const emit = defineEmits<EmitsType>();
const groupContent = ref<HTMLElement>();
const childEls = ref<HTMLDivElement[]>([]);
const animationFrame = ref<AnimationFrame>();

// 组件状态
const initData = {
  debounce: true, // 防止抖动动画
  triggerActive: 0,
  isHoverContent: false,
  isRepeatedly: false, // 控制repeatedly反复方向
  contentObserver: void 0 as undefined | MutationObserver
};
const state = reactive({ ...initData });

/**
 * 计算轮播容器样式
 */
const carouselStyle = computed((): StyleValue => {
  const { width, height } = props;
  return { width: `${width}px`, height: `${height}px` };
});

/**
 * 计算轮播容器类名
 */
const carouselClasses = computed(() => {
  return ["t-carousel-group", `t-carousel-group-${props.direction}`];
});

/**
 * 计算指示器类名
 */
const triggerClasses = computed(() => {
  return ["_trigger"];
});

/**
 * 计算内容区域类名
 */
const contentClasses = computed(() => {
  return ["_content"];
});

/**
 * 计算子元素数量
 */
const childLength = computed(() => {
  if (props.toggle === "vision") {
    return childEls.value.length - 1;
  }
  return childEls.value.length;
});

/**
 * 处理上一个点击
 */
const handlePrevClick = () => {
  incrementedIndex(false);
};

/**
 * 处理下一个点击
 */
const handleNextClick = () => {
  incrementedIndex(true);
};

onDeactivated(() => {
  // 初始化状态
  Object.assign(state, initData);
  // 清空循环事件
  if (animationFrame.value) animationFrame.value.clear();
  // 删除绑定事件
  if (groupContent.value) {
    groupContent.value.removeEventListener("scroll", updatePageIndex);
    groupContent.value.removeEventListener("scrollend", clearBindDebounce);
    if (state.contentObserver) state.contentObserver.disconnect();
  }
});
onMounted(() => {
  updateChildEls();
  initCarousel();
});
// 动态控制轮播状态
watch(
  () => props.autoplay,
  val => {
    if (val) runAutoplay(animationFrame.value);
    else animationFrame.value.clear();
  }
);
/**
 * 动态更新子元素
 */
const updateChildEls = () => {
  childEls.value = Array.from(groupContent.value?.querySelectorAll("#_t-carousel"));
};
/**
 * 清空防抖处理
 */
const clearBindDebounce = () => {
  state.debounce = true;
};
/**
 * 更新当前活动元素
 */
const updatePageIndex = () => {
  const { toggle, trigger, autoplay } = props;
  if (trigger === "none" && autoplay) return;
  const el = groupContent.value;
  const box = props[boxConfig.value.box];
  const scrollDirection = el[boxConfig.value.scrollDirection];
  const scrollBox = el[boxConfig.value.scrollBox];
  // 使用四舍五入让指示标提前显示
  state.triggerActive = Math.round(scrollDirection / box);
  // 处理克隆多出的page
  if (toggle === "vision" && scrollDirection >= scrollBox - box) {
    state.triggerActive = 0;
  }
  updateElClass();
};
/**
 * 设置当前指示标位置
 * @param index 下标
 */
const setPageIndex = (index: number, val: typeof props.trigger, behavior: ScrollBehavior = "smooth") => {
  if (props.trigger === val)
    groupContent.value?.scrollTo({
      [boxConfig.value.direction]: props[boxConfig.value.box] * index,
      behavior: behavior
    });
};
/**
 * 轮播
 */
const runAutoplay = (animationFrame?: AnimationFrame) => {
  if (animationFrame)
    animationFrame.call(() => {
      toIndex(!props.autoplayBack);
      emit("autoplay", state.triggerActive);
    });
};
/**
 * 根据不同 toggle 值切换
 * @param is true: 前进 false:退后
 */
const toIndex = (is: boolean) => {
  const { toggle } = props;
  const el = groupContent.value;
  const direction = boxConfig.value.direction;
  const box = props[boxConfig.value.box];
  const isNone = toggle === "none";
  const isVision = toggle === "vision";
  const isRepeat = toggle === "repeat";
  const isRepeatedly = toggle === "repeatedly";
  // 鼠标进入暂停轮播（点击箭头时除外）
  if ((state.isHoverContent && state.debounce) || !el) return;
  const scrollDirection = el[boxConfig.value.scrollDirection];
  const scrollBox = el[boxConfig.value.scrollBox];
  // 当前处于最后一个
  const lastBox = scrollDirection >= scrollBox - box;
  // 最后一个下标的滚动值
  const lastDirection = childEls.value.length * box;
  // 当前处于第一个
  const firstBox = scrollDirection <= 0;
  if (isNone && ((firstBox && !is) || (lastBox && is))) return clearBindDebounce();
  // vision 需要提前 映射 克隆下标
  // vision 需要提前 映射 克隆下标
  if (isVision) {
    if (firstBox && !is) {
      el.scrollTo({
        [direction]: lastDirection
      });
    } else if (lastBox && is) {
      el.scrollTo({
        [direction]: 0
      });
    }
  }
  // repeat 边缘值时处理
  if (isRepeat) {
    if (firstBox && !is) {
      el.scrollTo({
        [direction]: lastDirection,
        behavior: "smooth"
      });
    } else if (lastBox && is) {
      el.scrollTo({
        [direction]: 0,
        behavior: "smooth"
      });
    } else {
      el.scrollBy({
        [direction]: is ? box : -box,
        behavior: "smooth"
      });
    }
  }
  // 反复(相反方向)
  else if (isRepeatedly) {
    if (lastBox) state.isRepeatedly = false;
    else if (firstBox) state.isRepeatedly = true;
    el.scrollBy({
      [direction]: state.isRepeatedly ? box : -box,
      behavior: "smooth"
    });
  } else {
    el.scrollBy({
      [direction]: is ? box : -box,
      behavior: "smooth"
    });
  }
};
/**
 * 根据 toggle 类型切换下标
 * @param is true: 下一个 ,false: 上一个
 */
const incrementedIndex = (is: boolean) => {
  if (!state.debounce) return;
  state.debounce = false;
  toIndex(is);
  emit("change", state.triggerActive);
};
/**
 * 根据 direction 方向获取对应宽高值
 * @param direction 方向key(props)
 * @param scrollDirection 滚动方向key(el)
 * @param box 方向值(el)
 * @param scrollBox 滚动方向值(el)
 */
const boxConfig = computed(() => {
  let params = {
    direction: "left",
    scrollDirection: "scrollLeft",
    box: "width",
    scrollBox: "scrollWidth"
  };
  if (props.direction === "vertical")
    params = {
      direction: "top",
      scrollDirection: "scrollTop",
      box: "height",
      scrollBox: "scrollHeight"
    };
  return params;
});
const updateElClass = () => {
  if (!props.animation) {
    // 清空动画class
    childEls.value.forEach(ch => {
      ch.classList.add("_active");
      ch.classList.remove("_def");
    });
    return;
  }
  const { toggle } = props;
  // 修改子元素样式
  childEls.value.forEach((ch, index) => {
    let active = state.triggerActive;
    // 如果是克隆元素特殊处理
    const isClone = toggle === "vision" && index === childEls.value.length - 1 && active === 0;
    if (active === index || isClone) {
      ch.classList.add("_active");
      ch.classList.remove("_def");
    } else {
      ch.classList.add("_def");
      ch.classList.remove("_active");
    }
  });
};

defineExpose<ExposesType>({
  /**
   * 手动修改下表
   * @param index 下表位置 >=0
   * @param behavior 是否动画
   */
  setIndex: (index: number, behavior: ScrollBehavior) => {
    if (index < 0) return;
    setPageIndex(index, props.trigger, behavior);
  },
  incrementedIndex
});

/**
 * 初始化轮播
 */
const initCarousel = () => {
  if (childEls.value.length && groupContent.value) {
    // 监听滚动回调
    groupContent.value.addEventListener("scroll", updatePageIndex);
    // 监听滚动结束回调
    groupContent.value.addEventListener("scrollend", clearBindDebounce);
    // 监听容器子节点变化
    state.contentObserver = new MutationObserver(updateChildEls);
    state.contentObserver.observe(groupContent.value, { childList: true });
    // vision模式克隆视觉组件
    if (props.toggle === "vision") {
      groupContent.value.append(childEls.value[0].cloneNode(true));
    }
    // 初始定位
    setPageIndex(props.initIndex, props.trigger);
    // 开启播放
    if (props.autoplay) {
      animationFrame.value = new AnimationFrame(props.delay);
      runAutoplay(animationFrame.value);
    }
    // 初步更新子节点样式
    updateElClass();
  }
};
</script>
