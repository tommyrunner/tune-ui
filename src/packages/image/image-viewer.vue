<template>
  <teleport to="body" :disabled="!teleported">
    <transition name="t-fade">
      <div
        v-show="state.visible"
        ref="viewerRef"
        class="t-image-viewer__wrapper"
        :style="{ zIndex }"
        tabindex="-1"
        @click.self="hide"
      >
        <!-- 顶部操作栏 -->
        <div class="t-image-viewer__header">
          <slot name="toolbar">
            <div class="t-image-viewer__actions">
              <t-icon class="t-image-viewer__action" icon="amplify" @click="handleActions('zoomIn')" />
              <t-icon class="t-image-viewer__action" icon="reduce" @click="handleActions('zoomOut')" />
              <span class="t-image-viewer__actions-divider" />
              <t-icon class="t-image-viewer__action" icon="rotate-left" @click="handleActions('anticlockwise')" />
              <t-icon class="t-image-viewer__action" icon="rotate-right" @click="handleActions('clockwise')" />
              <span class="t-image-viewer__actions-divider" />
              <t-icon class="t-image-viewer__action" icon="close" @click="hide" />
            </div>
          </slot>
        </div>

        <!-- 上一张/下一张按钮 -->
        <div v-if="urlList.length > 1" class="t-image-viewer__btn t-image-viewer__prev" @click="prev">
          <t-icon icon="left" />
        </div>
        <div v-if="urlList.length > 1" class="t-image-viewer__btn t-image-viewer__next" @click="next">
          <t-icon icon="right" />
        </div>

        <!-- 图片容器 -->
        <div class="t-image-viewer__canvas">
          <img
            ref="imgRef"
            :src="currentUrl"
            class="t-image-viewer__img"
            :style="imageStyle"
            @load="handleLoad"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            @wheel="handleWheel"
          />
        </div>

        <!-- 底部进度条 -->
        <div v-if="showProgress" class="t-image-viewer__progress">
          <slot name="progress" :index="state.currentIndex" :total="urlList.length">
            <span>{{ `${state.currentIndex + 1} / ${urlList.length}` }}</span>
          </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, reactive, onMounted, onBeforeUnmount, ref } from "vue";
import type { CSSProperties } from "vue";
import type { ViewerProps, ViewerEmits, ViewerState, ViewerAction } from "./image-viewer";
import { TIcon } from "@/packages/icon";

// Props 定义
const props = withDefaults(defineProps<ViewerProps>(), {
  urlList: () => [],
  zIndex: 2000,
  initialIndex: 0,
  infinite: true,
  zoomRate: 1.2,
  minScale: 0.2,
  maxScale: 7,
  teleported: true,
  showProgress: true,
  closeOnPressEscape: true
});

// Emits 定义
const emit = defineEmits<ViewerEmits>();

// Refs
const viewerRef = ref<HTMLDivElement>();
const imgRef = ref<HTMLImageElement>();

// 状态管理
const state = reactive<ViewerState>({
  visible: false,
  currentIndex: props.initialIndex,
  scale: 1,
  rotate: 0,
  position: { x: 0, y: 0 },
  transform: { x: 0, y: 0 },
  isDragging: false,
  startPosition: { x: 0, y: 0 }
});

// 计算属性
const currentUrl = computed(() => props.urlList[state.currentIndex]);

const imageStyle = computed((): CSSProperties => {
  const { x, y } = state.transform;
  return {
    transform: `scale(${state.scale}) rotate(${state.rotate}deg) translate(${x}px, ${y}px)`,
    cursor: state.isDragging ? "grabbing" : "grab"
  };
});

// 图片操作方法
const handleActions = (action: ViewerAction) => {
  switch (action) {
    case "zoomIn":
      state.scale = Math.min(props.maxScale, state.scale * props.zoomRate);
      break;
    case "zoomOut":
      state.scale = Math.max(props.minScale, state.scale / props.zoomRate);
      break;
    case "clockwise":
      state.rotate = state.rotate + 90;
      emit("rotate", state.rotate);
      break;
    case "anticlockwise":
      state.rotate = state.rotate - 90;
      emit("rotate", state.rotate);
      break;
  }
};

// 重置变换
const resetTransform = () => {
  state.scale = 1;
  state.rotate = 0;
  state.transform = { x: 0, y: 0 };
};

// 图片切换
const prev = () => {
  if (props.urlList.length <= 1) return;
  const newIndex = state.currentIndex - 1;
  state.currentIndex = props.infinite ? (newIndex + props.urlList.length) % props.urlList.length : Math.max(newIndex, 0);
  resetTransform();
  emit("switch", state.currentIndex);
};

const next = () => {
  if (props.urlList.length <= 1) return;
  const newIndex = state.currentIndex + 1;
  state.currentIndex = props.infinite ? newIndex % props.urlList.length : Math.min(newIndex, props.urlList.length - 1);
  resetTransform();
  emit("switch", state.currentIndex);
};

// 拖拽相关
const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault();
  state.isDragging = true;
  state.startPosition = {
    x: e.clientX - state.transform.x,
    y: e.clientY - state.transform.y
  };
};

const handleMouseMove = (e: MouseEvent) => {
  if (!state.isDragging) return;
  e.preventDefault();
  state.transform = {
    x: e.clientX - state.startPosition.x,
    y: e.clientY - state.startPosition.y
  };
};

const handleMouseUp = () => {
  state.isDragging = false;
};

// 缩放相关
const handleWheel = (e: WheelEvent) => {
  e.preventDefault();
  handleActions(e.deltaY > 0 ? "zoomOut" : "zoomIn");
};

// 触摸事件处理
let touchStartX = 0;
let touchStartY = 0;
let initialScale = 1;

// 添加触摸事件监听
const addTouchListeners = () => {
  if (imgRef.value) {
    imgRef.value.addEventListener("touchstart", handleTouchStart, { passive: false });
    imgRef.value.addEventListener("touchmove", handleTouchMove, { passive: false });
    imgRef.value.addEventListener("touchend", handleTouchEnd);
  }
};

// 移除触摸事件监听
const removeTouchListeners = () => {
  if (imgRef.value) {
    imgRef.value.removeEventListener("touchstart", handleTouchStart);
    imgRef.value.removeEventListener("touchmove", handleTouchMove);
    imgRef.value.removeEventListener("touchend", handleTouchEnd);
  }
};

const handleTouchStart = (e: TouchEvent) => {
  e.preventDefault();
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX - state.transform.x;
    touchStartY = e.touches[0].clientY - state.transform.y;
    state.isDragging = true;
  } else if (e.touches.length === 2) {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    initialScale = state.scale;
    touchStartX = (touch1.clientX + touch2.clientX) / 2;
    touchStartY = (touch1.clientY + touch2.clientY) / 2;
  }
};

const handleTouchMove = (e: TouchEvent) => {
  e.preventDefault();
  if (e.touches.length === 1 && state.isDragging) {
    state.transform = {
      x: e.touches[0].clientX - touchStartX,
      y: e.touches[0].clientY - touchStartY
    };
  } else if (e.touches.length === 2) {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const currentDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
    const initialDistance = Math.hypot(touchStartX, touchStartY);
    if (initialDistance > 0) {
      const scale = (currentDistance / initialDistance) * initialScale;
      state.scale = Math.min(Math.max(scale, props.minScale), props.maxScale);
    }
  }
};

const handleTouchEnd = () => {
  state.isDragging = false;
};

// 图片加载处理
const handleLoad = () => {
  state.visible = true;
  // 添加触摸事件支持
  addTouchListeners();
};

// 生命周期钩子
onMounted(() => {
  state.visible = true;
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  removeTouchListeners();
});

// 关闭预览
const hide = () => {
  state.visible = false;
  resetTransform();
  emit("close");
};

// 键盘事件处理
const handleKeydown = (e: KeyboardEvent) => {
  if (!state.visible) return;

  switch (e.key) {
    case "Escape":
      if (props.closeOnPressEscape) hide();
      break;
    case "ArrowLeft":
      prev();
      break;
    case "ArrowRight":
      next();
      break;
    case "+":
    case "=":
      handleActions("zoomIn");
      break;
    case "-":
      handleActions("zoomOut");
      break;
    case "r":
      handleActions("clockwise");
      break;
    case "R":
      handleActions("anticlockwise");
      break;
  }
};

// 对外暴露的方法
defineExpose({
  setActiveItem: (index: number) => {
    state.currentIndex = index;
    resetTransform();
  }
});
</script>

<style lang="scss">
@import "./image-viewer.scss";
</style>
