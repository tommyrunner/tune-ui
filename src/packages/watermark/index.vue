<template>
  <div class="t-watermark" ref="watermarkRef">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// 类型导入
import type { PropsType } from "./watermark";
import type { StyleValue } from "vue";
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
// 常量导入
import {
  DEFAULT_FONT,
  DEFAULT_GAP,
  DEFAULT_Z_INDEX,
  DEFAULT_ROTATE,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_IMAGE_MODE,
  DEFAULT_FONT_WEIGHT,
  OBSERVER_CONFIG
} from "./constants";

/**
 * @description 水印组件
 */
defineOptions({ name: "TWatermark" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  rotate: DEFAULT_ROTATE,
  zIndex: DEFAULT_Z_INDEX,
  image: undefined,
  imageMode: DEFAULT_IMAGE_MODE,
  content: undefined,
  font: () => DEFAULT_FONT,
  fontWeight: DEFAULT_FONT_WEIGHT,
  gap: () => [...DEFAULT_GAP] as [number, number],
  offset: undefined,
  antiTamper: true,
  opacity: 1.0
});

/**
 * @description DOM引用
 */
const watermarkRef = ref<HTMLElement | null>(null);
let containerEl: HTMLElement | null = null;

/**
 * @description 水印数据
 */
const base64Url = ref<string>("");
const gapX = computed(() => props.gap[0]);
const gapY = computed(() => props.gap[1]);
const offsetLeft = computed(() => props.offset?.[0] ?? gapX.value / 2);
const offsetTop = computed(() => props.offset?.[1] ?? gapY.value / 2);
const backgroundSize = computed(() => `${props.width + gapX.value}px ${props.height + gapY.value}px`);
const backgroundPosition = computed(() => `${offsetLeft.value}px ${offsetTop.value}px`);

/**
 * @description MutationObserver实例
 */
let observer: MutationObserver | null = null;

/**
 * @description 计算容器样式
 * @returns {StyleValue} 样式对象
 */
const getContainerStyle = (): StyleValue => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundRepeat: "repeat",
  backgroundImage: `url(${base64Url.value})`,
  backgroundSize: backgroundSize.value,
  backgroundPosition: backgroundPosition.value,
  zIndex: props.zIndex
});

/**
 * @description 创建并添加水印容器元素
 */
const createContainer = (): void => {
  if (!watermarkRef.value || !base64Url.value) return;

  // 移除现有容器
  removeContainer();

  // 创建新容器
  containerEl = document.createElement("div");
  containerEl.className = "t-watermark__container";

  // 设置样式
  const styles = getContainerStyle();
  Object.keys(styles).forEach(key => {
    if (styles[key] !== undefined) {
      containerEl!.style[key as any] = styles[key] as string;
    }
  });

  // 添加到DOM
  watermarkRef.value.appendChild(containerEl);
};

/**
 * @description 移除水印容器元素
 */
const removeContainer = (): void => {
  if (containerEl && containerEl.parentNode) {
    containerEl.parentNode.removeChild(containerEl);
    containerEl = null;
  }
};

/**
 * @description 获取画布
 * @returns {HTMLCanvasElement} 画布元素
 */
const getCanvas = (width: number, height: number): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

/**
 * @description 绘制水印
 */
const drawWatermark = async (): Promise<void> => {
  if (!watermarkRef.value) return;

  // 如果没有内容和图片，不需要创建水印
  if (!props.content && !props.image) {
    removeContainer();
    return;
  }

  const canvasWidth = props.width + gapX.value;
  const canvasHeight = props.height + gapY.value;
  const canvas = getCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();

  const drawAreaX = gapX.value / 2;
  const drawAreaY = gapY.value / 2;

  ctx.globalAlpha = props.opacity;

  ctx.translate(drawAreaX + props.width / 2, drawAreaY + props.height / 2);

  if (props.rotate !== 0) {
    ctx.rotate((props.rotate * Math.PI) / 180);
  }

  ctx.translate(-props.width / 2, -props.height / 2);

  const {
    fontSize = 16,
    fontStyle = "normal",
    fontWeight = props.fontWeight || "normal",
    fontFamily = "sans-serif",
    textAlign = "center",
    textBaseline = "middle",
    color = "rgba(0, 0, 0, 0.15)"
  } = props.font;

  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = textAlign as CanvasTextAlign;
  ctx.textBaseline = textBaseline as CanvasTextBaseline;

  if (props.image) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = props.image;
    img.onload = () => {
      let scaledWidth: number;
      let scaledHeight: number;
      let drawX: number;
      let drawY: number;

      // 根据不同的imageMode处理图片尺寸和位置
      switch (props.imageMode) {
        case "cover":
          // 填满整个区域并裁剪
          const scaleCover = Math.max(props.width / img.width, props.height / img.height);
          scaledWidth = img.width * scaleCover;
          scaledHeight = img.height * scaleCover;
          drawX = (props.width - scaledWidth) / 2;
          drawY = (props.height - scaledHeight) / 2;
          break;

        case "fill":
          // 拉伸填满整个区域
          scaledWidth = props.width;
          scaledHeight = props.height;
          drawX = 0;
          drawY = 0;
          break;

        case "none":
          // 使用原始尺寸
          scaledWidth = img.width;
          scaledHeight = img.height;
          drawX = (props.width - scaledWidth) / 2;
          drawY = (props.height - scaledHeight) / 2;
          break;

        case "contain":
        default:
          // 保持原比例缩放
          const scaleContain = Math.min(props.width / img.width, props.height / img.height);
          scaledWidth = img.width * scaleContain;
          scaledHeight = img.height * scaleContain;
          drawX = (props.width - scaledWidth) / 2;
          drawY = (props.height - scaledHeight) / 2;
          break;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      ctx.globalAlpha = props.opacity;
      ctx.translate(drawAreaX + props.width / 2, drawAreaY + props.height / 2);
      if (props.rotate !== 0) {
        ctx.rotate((props.rotate * Math.PI) / 180);
      }
      ctx.translate(-props.width / 2, -props.height / 2);

      ctx.drawImage(img, drawX, drawY, scaledWidth, scaledHeight);
      ctx.restore();

      base64Url.value = canvas.toDataURL("image/png");
      createContainer();
    };
    img.onerror = () => {
      console.error("Watermark image load error");
    };
    return;
  }

  if (props.content) {
    const content = Array.isArray(props.content) ? props.content : [props.content];
    const lineHeight = fontSize;
    const textHeight = content.length * lineHeight;

    const centerX = props.width / 2;
    const startY = (props.height - textHeight) / 2 + lineHeight / 2;

    content.forEach((text, index) => {
      ctx.fillText(text, centerX, startY + index * lineHeight);
    });
  }

  ctx.restore();

  base64Url.value = canvas.toDataURL("image/png");
  createContainer();
};

/**
 * @description 重置水印
 */
const resetWatermark = async (): Promise<void> => {
  await drawWatermark();

  await nextTick();

  if (props.antiTamper) {
    setupAntiTamperMeasures();
  }
};

/**
 * @description 检查容器是否已添加
 */
const checkContainerExists = (): boolean => {
  if (!watermarkRef.value || !containerEl) return false;

  // 检查容器元素是否在DOM中
  return watermarkRef.value.contains(containerEl);
};

/**
 * @description 设置防篡改措施
 */
const setupAntiTamperMeasures = (): void => {
  if (!watermarkRef.value) return;

  removeObserver();

  // 监听水印元素的变化
  observer = new MutationObserver(mutations => {
    let needReset = false;

    for (const mutation of mutations) {
      // 如果是子节点变化，检查是否有容器元素被移除
      if (mutation.type === "childList" && !checkContainerExists()) {
        needReset = true;
        break;
      }

      // 如果是属性变化，只关注style和class属性
      if (
        mutation.type === "attributes" &&
        (mutation.attributeName === "style" || mutation.attributeName === "class") &&
        (mutation.target === watermarkRef.value || mutation.target === containerEl)
      ) {
        needReset = true;
        break;
      }
    }

    if (needReset) {
      resetWatermark();
    }
  });

  observer.observe(watermarkRef.value, OBSERVER_CONFIG);
  if (containerEl) {
    observer.observe(containerEl, OBSERVER_CONFIG);
  }
};

/**
 * @description 移除观察者
 */
const removeObserver = (): void => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
};

/**
 * @description 监听属性变化，重新绘制水印
 */
watch(props, () => resetWatermark(), { deep: true });

/**
 * @description 组件挂载时绘制水印并设置防篡改监听
 */
onMounted(() => {
  resetWatermark();
});

/**
 * @description 组件卸载时移除观察者和容器元素
 */
onUnmounted(() => {
  removeObserver();
  removeContainer();
});
defineExpose({
  resetWatermark
});
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
