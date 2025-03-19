<template>
  <div class="t-image" ref="imgRef" :style="style" @click="clickHandler">
    <img
      v-show="hasLoadedImage"
      :src="imgSrc"
      :alt="alt"
      :style="imageStyle"
      :class="imageClasses"
      :referrerpolicy="referrerPolicy"
      @load="handleLoad"
      @error="handleError"
    />

    <!-- 加载中 -->
    <div v-if="state.loading" class="t-image__loading">
      <slot name="placeholder">
        <t-icon icon="loading" class="t-loading" />
      </slot>
    </div>

    <!-- 加载失败 -->
    <div v-if="state.hasError" class="t-image__error">
      <slot name="error">
        <t-icon icon="image" />
      </slot>
    </div>

    <!-- 图片预览 -->
    <image-viewer
      v-if="state.showViewer"
      :z-index="zIndex"
      :initial-index="initialIndex || 0"
      :url-list="previewSrcList || [src]"
      :infinite="infinite"
      :zoom-rate="zoomRate"
      :min-scale="minScale"
      :max-scale="maxScale"
      :close-on-press-escape="closeOnPressEscape"
      @close="closeViewer"
      @switch="handleSwitch"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import type { CSSProperties } from "vue";
import type { PropsType, EmitsType, ImageState } from "./image";
import { TIcon } from "@/packages/icon";
import ImageViewer from "./image-viewer.vue";

// Props 定义
const props = withDefaults(defineProps<PropsType>(), {
  fit: "fill",
  lazy: false,
  zIndex: 2000,
  infinite: true,
  zoomRate: 1.2,
  minScale: 0.2,
  maxScale: 7,
  closeOnPressEscape: true
});

// Emits 定义
const emit = defineEmits<EmitsType>();

// 状态管理
const state = reactive<ImageState>({
  hasError: false,
  isLoaded: false,
  loading: true,
  showViewer: false,
  naturalWidth: 0,
  naturalHeight: 0
});

// Refs
const imgRef = ref<HTMLDivElement>();
const isInView = ref(false);

// 计算属性
const style = computed(
  (): CSSProperties => ({
    width: props.width,
    height: props.height,
    position: "relative"
  })
);

const imageStyle = computed(
  (): CSSProperties => ({
    width: "100%",
    height: "100%"
  })
);

const hasLoadedImage = computed(() => state.isLoaded && !state.hasError);
/**
 * 图片源
 */
const imgSrc = computed(() => {
  if (!props.lazy) return props.src;
  return isInView.value ? props.src : "";
});
/**
 * 图片类名
 */
const imageClasses = computed(() => [
  "t-image__inner",
  props.fit && `t-image__fit--${props.fit}`,
  state.isLoaded && "is-loaded",
  { "t-image__inner--center": true }
]);

// 图片加载相关
const handleLoad = (evt: Event) => {
  state.loading = false;
  state.isLoaded = true;
  state.hasError = false;

  const img = evt.target as HTMLImageElement;
  state.naturalWidth = img.naturalWidth;
  state.naturalHeight = img.naturalHeight;

  emit("load", evt);
};

const handleError = (evt: Event) => {
  state.loading = false;
  state.hasError = true;
  emit("error", evt);
};

// 预览相关
const clickHandler = () => {
  if (state.hasError || !state.isLoaded || !props.previewSrcList) {
    return;
  }
  showPreview();
};

/**
 * 显示预览
 */
const showPreview = () => {
  state.showViewer = true;
  emit("show");
};

const closeViewer = () => {
  state.showViewer = false;
  emit("close");
};

const handleSwitch = (index: number) => {
  emit("switch", index);
};

// 懒加载相关
let observer: IntersectionObserver | null = null;

const setupIntersectionObserver = () => {
  if (!props.lazy) return;

  observer = new IntersectionObserver(
    (entries, observe) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        isInView.value = true;
        observe.unobserve(entry.target);
      }
    },
    {
      threshold: 0.1 // 当图片出现 10% 时触发加载
    }
  );

  if (imgRef.value) {
    observer.observe(imgRef.value);
  }
};

// 生命周期钩子
onMounted(setupIntersectionObserver);

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});

// 导出方法供外部使用
defineExpose({
  showPreview
});
</script>

<style lang="scss">
@import "./index.scss";
</style>
