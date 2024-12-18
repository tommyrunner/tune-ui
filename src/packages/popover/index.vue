<template>
  <div class="t-popover" ref="contentRef" @mouseenter="state.isHoverOther = true" @mouseleave="state.isHoverOther = false">
    <Teleport :to="props.appendTo">
      <Transition :name="getTransitionName" @after-enter="animationAfterEnter" @enter="animationEnter" @leave="animationLeave">
        <div
          @mouseenter="onPopoverHoverEnter"
          @mouseleave="onPopoverHoverOut"
          v-if="model && !props.disabled"
          :class="getPopoverClass"
          :style="getPopoverStyle"
          :id="state.popoverId"
        >
          <slot name="content">
            <span>{{ props.content }}</span>
          </slot>
          <div class="_triangle" :style="getTriangleStyle">
            <div></div>
            <div></div>
          </div>
        </div>
      </Transition>
      <!-- 遮罩 -->
      <Transition name="t-model">
        <div class="_t-model" v-if="props.isModal && model" :style="getModelStyle" @click="emit('clickModel')"></div>
      </Transition>
    </Teleport>

    <slot>
      <div></div>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from "./popover";
import { bindDebounce, fromCssVal, generateId, getMaxZIndex, isDownKeyboard } from "@/utils";
import { computed, nextTick, onDeactivated, onMounted, reactive, ref, StyleValue, toRefs, watch } from "vue";
defineOptions({ name: "TPopover" });
const props = withDefaults(defineProps<PropsType>(), {
  gap: 12,
  type: "hover",
  position: "top",
  appendTo: "body",
  hideAfter: 150,
  radius: () => [8, 8, 8, 8],
  padding: () => [8, 12, 8, 12],
  boxShadow: () => [0, 0, 4, "rgba(0, 0, 0, 0.5)"],
  showArrow: true,
  autoPosition: true,
  custom: void 0,
  closeOnPressEscape: true,
  closeOnPressOther: true
});
const state = reactive({
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
 * 标记离开popover上
 */
const onPopoverHoverEnter = (event: MouseEvent) => {
  state.isHoverOther = state.isHoverPopover = true;
  emit("hoverEnter", event.target as HTMLElement);
};
/**
 * 标记是否hover在popover上
 */
const onPopoverHoverOut = (event: MouseEvent) => {
  state.isHoverOther = state.isHoverPopover = false;
  hidePopover();
  emit("hoverOut", event.target as HTMLElement);
};
/**
 * 更新元素位置
 * @param el 更新元素
 */
const updateView = async (el: Element) => {
  await nextTick();
  const { position } = props;
  popoverRef.value = document.body.querySelector(`#${state.popoverId}`);
  state.popoverRect = el.getBoundingClientRect();
  state.point = getPoint(state.popoverRect, position);
  // 自动检测如果超出调整 position
  autoPosition(state.popoverRect, popoverRef.value);
};
/**
 * 自动调整 position
 * @param rect 元素信息
 */
const autoPosition = (elRect: DOMRect, contentEl: HTMLDivElement) => {
  const { gap, autoPosition } = props;
  if (!autoPosition) return;
  // 处理window溢出
  const documentScrollY = document.documentElement.scrollTop;
  const documentScrollX = document.documentElement.scrollLeft;
  // 获取元素信息
  const { offsetWidth = 0, offsetHeight = 0 } = contentEl || {};
  const { innerWidth, innerHeight } = window;
  let { point } = state;
  let newPosition = props.position;
  if (point.left - gap - documentScrollX < 0) {
    newPosition = "right";
  } else if (point.top - gap - documentScrollY < 0) {
    newPosition = "bottom";
  } else if (point.left > innerWidth - gap - offsetWidth) {
    newPosition = "left";
  } else if (point.top > innerHeight - gap - offsetHeight) {
    newPosition = "top";
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
 * 处理子元素初始化事件
 * @param event
 */
const childClickHandler = (event: MouseEvent) => {
  bindPopover(event.target as Element, "click");
};

const childMouseenterHandler = (event: MouseEvent) => {
  bindPopover(event.target as Element, "hover");
};

const childMouseleaveHandler = () => {
  hidePopover();
};
/**
 * 处理元素事件
 * @param remove 是否移出事件
 */
const handlerEventListener = (remove = false) => {
  const method = remove ? "removeEventListener" : "addEventListener";
  window[method]("keydown", keydownHandler);
  window[method]("mousedown", mousedownHandler);
  if (contentRef.value) {
    Array.from(contentRef.value.children).forEach(child => {
      child[method]("click", childClickHandler);
      child[method]("mouseenter", childMouseenterHandler);
      child[method]("mouseleave", childMouseleaveHandler);
      // 初始化样式
      if (!remove) updateView(child);
    });
  }
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
      left: x,
      top: !popoverRef.value ? y - gap : y - offsetHeight - gap
    };
  } else if (position === "right") {
    point = {
      left: x + width + gap,
      // 元素的y轴减去元素的高度，以为箭头是局中的需要减去本身的一半
      top: y + height / 2 - offsetHeight / 2
    };
  } else if (position === "bottom") {
    point = {
      left: x,
      top: y + height + gap
    };
  } else if (position === "left") {
    point = {
      left: -(offsetWidth - x + gap),
      top: y + height / 2 - offsetHeight / 2
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
  // 切换dialog动画
  if (dialogAnimation) animationClass = `_t-popover-dialog`;
  // 切换drawer动画
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
 * 根据元素动态三角的指向以及样式
 */
const getTriangleStyle = computed((): StyleValue => {
  const { gap, showArrow } = props;
  // 元素
  const { height = gap, width = gap } = state.popoverRect || {};
  // popover
  const { offsetHeight = 0, offsetWidth = 0 } = popoverRef.value || {};
  // 通过popover与元素对比取最小宽高(优先于元素大小)
  const valW = width / 2;
  const valH = height / 2;
  const contrast: any = {
    width: width < offsetWidth ? `${valW}px` : "50%",
    height: height < offsetHeight ? `${valH}px` : "50%"
  };
  let point: any = {
    left: "initial",
    top: "initial",
    right: "initial",
    bottom: "initial"
  };
  if (state.dyPosition === "top")
    point = {
      bottom: "0px",
      left: contrast.width
    };
  else if (state.dyPosition === "right")
    point = {
      left: "0px",
      top: contrast.height
    };
  else if (state.dyPosition === "bottom")
    point = {
      top: "0px",
      left: contrast.width
    };
  else if (state.dyPosition === "left")
    point = {
      right: "0px",
      top: contrast.height
    };
  // visibility 不满足显示三角条件(隐藏)
  return {
    visibility: valW < 0 || valH < 0 || !showArrow ? "hidden" : "visible",
    ...point
  };
});
defineExpose({
  popoverRef,
  ...toRefs(state)
});
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
