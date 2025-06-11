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
import "./index.scss";

import type { CSSProperties } from "vue";
import type { PropsType, EmitsType, ImageState, ExposesType } from "./image";

import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import { TIcon } from "@/packages/icon";
import ImageViewer from "./image-viewer.vue";

defineOptions({ name: "TImage" });

/**
 * @description 组件Props定义
 */
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

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description 状态管理
 */
const state = reactive<ImageState>({
  hasError: false,
  isLoaded: false,
  loading: true,
  showViewer: false,
  naturalWidth: 0,
  naturalHeight: 0
});

/**
 * @description DOM引用
 */
const imgRef = ref<HTMLDivElement>();
const isInView = ref(false);

/**
 * @description 计算容器样式
 * @returns {CSSProperties} 样式对象
 */
const style = computed(
  (): CSSProperties => ({
    width: props.width,
    height: props.height,
    position: "relative"
  })
);

/**
 * @description 计算图片样式
 * @returns {CSSProperties} 样式对象
 */
const imageStyle = computed(
  (): CSSProperties => ({
    width: "100%",
    height: "100%"
  })
);

/**
 * @description 判断图片是否已加载
 * @returns {boolean} 是否已加载
 */
const hasLoadedImage = computed((): boolean => state.isLoaded && !state.hasError);

/**
 * @description 计算图片源
 * @returns {string} 图片源地址
 */
const imgSrc = computed((): string => {
  if (!props.lazy) return props.src;
  return isInView.value ? props.src : "";
});

/**
 * @description 计算图片类名
 * @returns {Array<string | Record<string, boolean>>} 类名数组
 */
const imageClasses = computed(
  (): Array<string | Record<string, boolean>> =>
    [
      "t-image__inner",
      props.fit && `t-image__fit--${props.fit}`,
      state.isLoaded && "is-loaded",
      { "t-image__inner--center": true }
    ].filter(Boolean)
);

/**
 * @description 处理图片加载成功
 * @param {Event} evt - 加载事件
 * @returns {void}
 */
const handleLoad = (evt: Event): void => {
  state.loading = false;
  state.isLoaded = true;
  state.hasError = false;

  const img = evt.target as HTMLImageElement;
  state.naturalWidth = img.naturalWidth;
  state.naturalHeight = img.naturalHeight;

  emit("load", evt);
};

/**
 * @description 处理图片加载失败
 * @param {Event} evt - 错误事件
 * @returns {void}
 */
const handleError = (evt: Event): void => {
  state.loading = false;
  state.hasError = true;
  emit("error", evt);
};

/**
 * @description 处理点击事件
 * @returns {void}
 */
const clickHandler = (): void => {
  if (state.hasError || !state.isLoaded || !props.previewSrcList) {
    return;
  }
  showPreview();
};

/**
 * @description 显示预览
 * @returns {void}
 */
const showPreview = (): void => {
  state.showViewer = true;
  emit("show");
};

/**
 * @description 关闭预览器
 * @returns {void}
 */
const closeViewer = (): void => {
  state.showViewer = false;
  emit("close");
};

/**
 * @description 处理图片切换
 * @param {number} index - 图片索引
 * @returns {void}
 */
const handleSwitch = (index: number): void => {
  emit("switch", index);
};

/**
 * @description 懒加载观察器
 */
let observer: IntersectionObserver | null = null;

/**
 * @description 设置交叉观察器
 * @returns {void}
 */
const setupIntersectionObserver = (): void => {
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
defineExpose<ExposesType>({
  showPreview
});
</script>
