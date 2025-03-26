<template>
  <div class="t-popover" ref="contentRef" @mouseenter="state.isHoverOther = true" @mouseleave="state.isHoverOther = false">
    <teleport :to="props.appendTo">
      <transition :name="getTransitionName" @after-enter="animationAfterEnter" @enter="animationEnter" @leave="animationLeave">
        <div
          v-if="(model && !props.disabled) || state.firstPosition"
          @mouseenter="onPopoverHoverEnter"
          @mouseleave="onPopoverHoverOut"
          :class="getPopoverClass"
          :style="getPopoverStyle"
          ref="popoverRef"
        >
          <slot name="content">
            <span>{{ props.content }}</span>
          </slot>
          <div class="_triangle" :style="getTriangleStyle">
            <div :style="{ borderWidth: `${triangleWidth}px` }"></div>
            <div :style="{ borderWidth: `${triangleWidth}px` }"></div>
          </div>
        </div>
      </transition>
      <!-- 遮罩 -->
      <Transition name="t-model">
        <div class="_t-model" v-if="props.isModal && model" :style="getModelStyle" @click="emit('clickModel')"></div>
      </Transition>
    </teleport>

    <slot>
      <div></div>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from "./popover";
import type { StyleValue } from "vue";
import { triangleWidth } from "./popover";
import { bindDebounce, fromCssVal, generateId, getMaxZIndex, isDownKeyboard } from "@/utils";
import { computed, nextTick, onDeactivated, onMounted, reactive, ref, watch } from "vue";
defineOptions({ name: "TPopover" });
const props = withDefaults(defineProps<PropsType>(), {
  gap: 12,
  type: "hover",
  position: "top",
  appendTo: "body",
  hideAfter: 150,
  radius: () => [8, 8, 8, 8],
  padding: () => [8, 12, 8, 12],
  boxShadow: () => [0, 0, 4, "rgba(0, 0, 0, 0.2)"],
  showArrow: true,
  autoPosition: true,
  custom: void 0,
  closeOnPressEscape: true,
  closeOnPressOther: true
});
const state = reactive({
  // 是否第一次计算位置(计算位置需要popover显示)
  firstPosition: true,
  // 当前弹出元素
  currentEl: void 0 as Element,
  // popover标记id
  popoverId: "t-popover-0",
  // 需要popover的元素
  popoverRect: void 0 as DOMRect,
  // 动画标记
  isTransitionEnterOk: false,
  // 标记hover进入popover
  isHoverPopover: false,
  // 标记hover进入元素
  isHoverContent: false,
  // 动态方向
  dyPosition: props.position,
  // 标记鼠标是否处于其他区域
  isHoverOther: false,
  // 当前的z-index
  zIndex: 2001,
  // 暂存popover位置
  point: {
    left: 0,
    top: 0
  }
});
// 绑定显示值
const model = defineModel<boolean>();
const emit = defineEmits<EmitsType>();
const contentRef = ref<HTMLDivElement>();
const popoverRef = ref<HTMLDivElement>();
/**
 * 延迟隐藏popover，用户可能需要复制popover内部内容
 */
const bounceShow = bindDebounce(() => {
  if ((!state.isHoverPopover && !state.isHoverContent) || props.type === "click") model.value = false;
}, props.hideAfter);
/**
 * 显示popover
 */
const bindPopover = (el: Element, type: typeof props.type) => {
  if (type === props.type) {
    if (props.type === "click" && model.value) {
      hidePopover(true);
    } else {
      model.value = true;
      state.isHoverContent = true;
      updateView(el);
    }
  }
};

const maxZIndex = () => {
  return getMaxZIndex("._t-popover");
};
/**
 * 监听model变化
 */
watch(model, () => {
  if (model.value && props.isModalNest) {
    const max = maxZIndex();
    if (max >= state.zIndex) state.zIndex = max + 1;
  }
  // 抛出model改变事件
  nextTick(() => {
    if (model.value) emit("open");
    else emit("close");
    emit("modelChange");
  });
});
/**
 * 隐藏popover
 */
const hidePopover = (hide?: boolean) => {
  if (hide || props.type === "hover") {
    state.isHoverContent = false;
    bounceShow();
  }
};
/**
 * 显示popover
 */
const showPopover = () => {
  model.value = true;
};
/**
 * 标记离开popover上
 */
const onPopoverHoverEnter = (event: MouseEvent) => {
  state.isHoverOther = state.isHoverPopover = true;
  emit("hoverEnter", event.currentTarget as HTMLElement);
};
/**
 * 标记是否hover在popover上
 */
const onPopoverHoverOut = (event: MouseEvent) => {
  state.isHoverOther = state.isHoverPopover = false;
  hidePopover();
  emit("hoverOut", event.currentTarget as HTMLElement);
};
/**
 * 更新元素位置
 * @param el 更新元素
 */
const updateView = async (el?: Element) => {
  if (el) state.currentEl = el;
  await nextTick();
  const { position } = props;
  state.popoverRect = state.currentEl.getBoundingClientRect();
  state.point = getPoint(state.popoverRect, position);
  // 自动检测如果超出调整 position
  autoPosition(state.popoverRect, popoverRef.value);
  // 标记已计算好位置
  state.firstPosition = false;
};
/**
 * 自动调整 position
 * @param elRect 元素信息
 */
const autoPosition = (elRect: DOMRect, contentEl: HTMLDivElement) => {
  const { gap, autoPosition } = props;
  if (!autoPosition) return;

  // 获取视窗和滚动信息
  const documentScrollY = document.documentElement.scrollTop;
  const documentScrollX = document.documentElement.scrollLeft;
  const { innerWidth, innerHeight } = window;

  // 获取元素尺寸
  const { offsetWidth = 0, offsetHeight = 0 } = contentEl || {};
  const { point } = state;
  const { height: triggerHeight } = elRect;

  // 计算可用空间（考虑 popover 的实际尺寸）
  const topSpace = point.top - documentScrollY; // 上方总空间
  const bottomSpace = innerHeight - (point.top - documentScrollY + triggerHeight); // 下方总空间
  const leftSpace = point.left - documentScrollX; // 左侧总空间
  const rightSpace = innerWidth - (point.left + elRect.width - documentScrollX); // 右侧总空间

  // 计算实际需要的空间
  const spaces = {
    top: topSpace >= offsetHeight + gap, // 上方是否足够放置 popover
    bottom: bottomSpace >= offsetHeight + gap, // 下方是否足够放置 popover
    left: leftSpace >= offsetWidth + gap, // 左侧是否足够放置 popover
    right: rightSpace >= offsetWidth + gap // 右侧是否足够放置 popover
  };

  let newPosition = props.position;

  // 如果当前方向空间不足，选择其他有足够空间的方向
  if (!spaces[newPosition]) {
    // 优先选择对立方向
    const oppositeMap = { top: "bottom", bottom: "top", left: "right", right: "left" };
    const oppositePosition = oppositeMap[newPosition] as typeof props.position;

    if (spaces[oppositePosition]) {
      newPosition = oppositePosition;
    } else {
      // 如果对立方向也不行，选择任一个有足够空间的方向
      const availablePosition = Object.entries(spaces).find(([_, hasSpace]) => hasSpace)?.[0] as typeof props.position;
      if (availablePosition) {
        newPosition = availablePosition;
      }
    }
  }

  // 调整位置
  state.point = getPoint(elRect, newPosition);
  // 调整三角指向
  state.dyPosition = newPosition;
};

/**
 * 处理window初始化事件
 * 关闭条件:props && 条件 && 当前最上层
 */
const keydownHandler = (event: KeyboardEvent) => {
  if (props.closeOnPressEscape && isDownKeyboard(event, "escape") && maxZIndex() <= state.zIndex) model.value = false;
};

const mousedownHandler = () => {
  if (!state.isHoverOther && props.closeOnPressOther && maxZIndex() <= state.zIndex) model.value = false;
};

/**
 * 处理元素事件
 * @param remove 是否移出事件
 */
const handlerEventListener = async (remove = false) => {
  await nextTick();
  const method = remove ? "removeEventListener" : "addEventListener";
  window[method]("keydown", keydownHandler);
  window[method]("mousedown", mousedownHandler);
  if (contentRef.value) {
    Array.from(contentRef.value.children).forEach(child => {
      // 禁止冒泡(防止子元素触发)
      child[method]("click", childClickHandler);
      child[method]("mouseenter", childMouseenterHandler);
      child[method]("mouseleave", childMouseleaveHandler);
      // 初始化样式
      if (!remove) {
        state.currentEl = child;
        updateView();
      }
    });
  }
};
/**
 * 处理子元素初始化事件
 * @param event
 */
const childClickHandler = (event: MouseEvent) => {
  bindPopover(event.currentTarget as Element, "click");
};

const childMouseenterHandler = (event: MouseEvent) => {
  bindPopover(event.currentTarget as Element, "hover");
};

const childMouseleaveHandler = () => {
  hidePopover();
};
onDeactivated(() => {
  handlerEventListener(true);
});

onMounted(() => {
  state.popoverId = `t-popover-${generateId()}`;
  handlerEventListener();
});
// 标记动画状态
const animationEnter = () => {
  state.isTransitionEnterOk = true;
};
const animationAfterEnter = () => {
  state.isTransitionEnterOk = false;
};
const animationLeave = () => {
  state.isTransitionEnterOk = false;
};
// 动态处理popover样式
const getPopoverStyle = computed((): StyleValue => {
  const { padding = [], boxShadow = [], radius = [], width } = props;
  return {
    pointerEvents: state.isTransitionEnterOk ? "none" : "initial",
    // 如果第一次计算位置，则隐藏
    visibility: state.firstPosition ? "hidden" : "visible",
    left: `${state.point.left}px`,
    top: `${state.point.top}px`,
    padding: `${fromCssVal(padding)}`,
    boxShadow: `${fromCssVal(boxShadow)}`,
    borderRadius: `${fromCssVal(radius)}`,
    zIndex: state.zIndex,
    width: width
  };
});

// 动态处理遮罩层样式
const getModelStyle = computed((): StyleValue => {
  return {
    zIndex: state.zIndex - 1
  };
});
/**
 * 处理popover位置
 * @param domRect 元素信息
 * @param position 指定位置
 */
const getPoint = (domRect: DOMRect, position?: typeof props.position): typeof state.point => {
  const { x, y, width, height } = domRect;
  const { gap, custom } = props;
  const { offsetHeight = 0, offsetWidth = 0 } = popoverRef.value || {};
  let point = { left: 0, top: 0 };
  // 处理window溢出
  const documentScrollY = document.documentElement.scrollTop;
  const documentScrollX = document.documentElement.scrollLeft;
  // 处理自定义xy轴
  if (custom) {
    return (point = {
      left: custom.x,
      top: custom.y
    });
  }
  // 根据指定显示的位置调整样式
  if (position === "top") {
    point = {
      left: x + width / 2 - offsetWidth / 2, // 水平居中
      top: y - offsetHeight - gap
    };
  } else if (position === "right") {
    point = {
      left: x + width + gap,
      top: y + height / 2 - offsetHeight / 2 // 垂直居中
    };
  } else if (position === "bottom") {
    point = {
      left: x + width / 2 - offsetWidth / 2, // 水平居中
      top: y + height + gap
    };
  } else if (position === "left") {
    point = {
      left: x - offsetWidth - gap,
      top: y + height / 2 - offsetHeight / 2 // 垂直居中
    };
  }
  return {
    left: point.left + documentScrollX,
    top: point.top + documentScrollY
  };
};
const getPopoverClass = computed(() => {
  const { dialogAnimation, drawerAnimation } = props;
  let animationClass = `_t-popover-${state.dyPosition}`;
  // 切换dialog动画（耦合操作）
  if (dialogAnimation) animationClass = `_t-popover-dialog`;
  // 切换drawer动画（耦合操作）
  if (drawerAnimation) animationClass = `_t-popover-drawer-${props.position}`;
  // 因为抛出使用特殊格式
  return ["_t-popover", animationClass];
});
const getTransitionName = computed(() => {
  const { dialogAnimation, drawerAnimation } = props;
  let name = `t-popover-${state.dyPosition}`;
  // 切换dialog动画
  if (dialogAnimation) name = "t-popover-dialog";
  // 切换drawer动画
  if (drawerAnimation) name = `t-popover-drawer-${props.position}`;
  return name;
});
/**
 * 根据元素动态调整三角的位置
 */
const getTriangleStyle = computed((): StyleValue => {
  const { showArrow } = props;
  if (!showArrow || !state.popoverRect) return { visibility: "hidden" };

  const { offsetWidth = 0, offsetHeight = 0 } = popoverRef.value || {};

  let position = {
    left: "initial",
    top: "initial",
    right: "initial",
    bottom: "initial"
  };

  switch (state.dyPosition) {
    case "top":
    case "bottom": {
      // 对于上下方向，三角形应该水平居中
      position = {
        ...position,
        left: `${offsetWidth / 2 - triangleWidth}px`,
        [state.dyPosition === "top" ? "bottom" : "top"]: "0"
      };
      break;
    }
    case "left":
    case "right": {
      // 对于左右方向，三角形应该垂直居中
      position = {
        ...position,
        top: `${offsetHeight / 2 - triangleWidth}px`,
        [state.dyPosition === "left" ? "right" : "left"]: "0"
      };
      break;
    }
  }

  return {
    visibility: "visible",
    ...position
  };
});
defineExpose({
  popoverRef,
  updateView,
  showPopover,
  hidePopover
});
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
