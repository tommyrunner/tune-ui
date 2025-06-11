<template>
  <div
    :class="['t-color-picker', `t-color-picker--${baseSize}`, { 't-disabled': props.disabled }]"
    :tabindex="props.disabled ? undefined : props.tabindex"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <t-popover
      v-model="visible"
      type="click"
      position="bottom"
      :padding="0"
      :radius="[8, 8, 8, 8]"
      :disabled="props.disabled"
      :popper-class="props.popperClass"
      :append-to-body="props.teleported"
    >
      <!-- 颜色触发器 -->
      <div class="t-color-picker__trigger" @click="handleTriggerClick" @keydown.enter="handleTriggerClick">
        <div v-if="props.showAlpha" class="t-color-picker__trigger-alpha"></div>
        <div class="t-color-picker__trigger-color" :style="{ backgroundColor: displayedColor }"></div>
      </div>

      <!-- 下拉内容 -->
      <template #content>
        <div class="t-color-picker__dropdown">
          <div class="t-color-picker__dropdown-main">
            <!-- 颜色面板 -->
            <div class="t-color-picker__dropdown-panel">
              <!-- 饱和度/亮度选择区域 -->
              <div
                class="t-color-picker__dropdown-panel-saturation"
                :style="{ backgroundColor: hueColor }"
                ref="saturationRef"
                @mousedown="handleSaturationMouseDown"
              >
                <div class="t-color-picker__dropdown-panel-saturation-white"></div>
                <div class="t-color-picker__dropdown-panel-saturation-black"></div>
                <div
                  class="t-color-picker__dropdown-panel-saturation-cursor"
                  :style="{
                    left: `${saturation * 100}%`,
                    top: `${100 - value * 100}%`
                  }"
                ></div>
              </div>

              <!-- 色相/透明度控制条 -->
              <div class="t-color-picker__dropdown-panel-controls">
                <!-- 色相控制条 -->
                <div class="t-color-picker__dropdown-panel-controls-hue" ref="hueRef" @mousedown="handleHueMouseDown">
                  <div class="t-color-picker__dropdown-panel-controls-hue-cursor" :style="{ left: `${hue * 100}%` }"></div>
                </div>

                <!-- 透明度控制条 -->
                <div
                  v-if="props.showAlpha"
                  class="t-color-picker__dropdown-panel-controls-alpha"
                  ref="alphaRef"
                  @mousedown="handleAlphaMouseDown"
                >
                  <div
                    class="t-color-picker__dropdown-panel-controls-alpha-gradient"
                    :style="{
                      background: `linear-gradient(to right, transparent, ${hsvToRgb(hue, saturation, value)})`
                    }"
                  ></div>
                  <div class="t-color-picker__dropdown-panel-controls-alpha-cursor" :style="{ left: `${alpha * 100}%` }"></div>
                </div>
              </div>

              <!-- 颜色信息 -->
              <div class="t-color-picker__dropdown-panel-color">
                <div class="t-color-picker__dropdown-panel-color-block">
                  <div v-if="props.showAlpha" class="t-color-picker__dropdown-panel-color-block-alpha"></div>
                  <div
                    class="t-color-picker__dropdown-panel-color-block-inner"
                    :style="{ backgroundColor: displayedColor }"
                  ></div>
                </div>
                <div class="t-color-picker__dropdown-panel-color-value">
                  <input type="text" v-model="colorValue" @input="handleColorInput" @keydown.enter="handleConfirm" />
                </div>
              </div>
            </div>

            <!-- 预定义颜色 -->
            <div v-if="props.predefine && props.predefine.length > 0" class="t-color-picker__dropdown-predefine">
              <div class="t-color-picker__dropdown-predefine-colors">
                <div
                  v-for="(color, index) in props.predefine"
                  :key="index"
                  class="t-color-picker__dropdown-predefine-colors-item"
                  :style="{ backgroundColor: color }"
                  @click="handlePredefineColorSelect(color)"
                ></div>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="t-color-picker__dropdown-footer">
            <button class="t-color-picker__clear-btn" @click="handleClear">{{ TEXT_CLEAR }}</button>
            <button class="t-color-picker__confirm-btn" @click="handleConfirm">{{ TEXT_CONFIRM }}</button>
          </div>
        </div>
      </template>
    </t-popover>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";

import type { PropsType, EmitsType } from "./color-picker";

import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { configOptions, useOptions } from "@/hooks/useOptions";
import { TPopover } from "@/packages/popover";
import { useI18nText } from "./i18n";

/**
 * @description 颜色选择器组件
 */
defineOptions({ name: "TColorPicker" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  disabled: false,
  showAlpha: false,
  colorFormat: "hex",
  validateEvent: true,
  tabindex: 0,
  teleported: true
});

/**
 * @description 基础尺寸配置
 */
const { baseSize } = useOptions(props);

/**
 * @description 国际化文本
 */
const { TEXT_CLEAR, TEXT_CONFIRM } = useI18nText();

/**
 * @description 使用defineModel实现响应式值
 */
const colorModel = defineModel<string>();

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description 面板可见状态
 */
const visible = ref(false);

/**
 * @description 颜色值状态
 */
const hue = ref(0); // 色相 (0-1)
const saturation = ref(1); // 饱和度 (0-1)
const value = ref(1); // 明度 (0-1)
const alpha = ref(1); // 透明度 (0-1)

/**
 * @description DOM引用
 */
const saturationRef = ref<HTMLElement | null>(null);
const hueRef = ref<HTMLElement | null>(null);
const alphaRef = ref<HTMLElement | null>(null);

/**
 * @description 输入框颜色值
 */
const colorValue = ref("");

/**
 * @description 拖动状态
 */
const dragging = ref(false);

/**
 * @description 计算显示的颜色值
 * @returns {string} 格式化后的颜色值
 */
const displayedColor = computed((): string => {
  if (!colorModel.value) {
    return "transparent";
  }

  if (props.showAlpha) {
    return formatColor("rgba");
  }

  return formatColor(props.colorFormat);
});

/**
 * @description 计算色相对应的颜色
 * @returns {string} RGB颜色值
 */
const hueColor = computed((): string => {
  return hsvToRgb(hue.value, 1, 1);
});

/**
 * @description 监听colorModel变化
 */
watch(
  colorModel,
  newVal => {
    if (newVal) {
      parseColor(newVal);
    }
  },
  { immediate: true }
);

/**
 * @description 解析颜色值
 * @param {string} color - 要解析的颜色字符串
 * @returns {void}
 */
function parseColor(color: string): void {
  // 简单实现，实际应该使用更完善的颜色解析库
  if (color.startsWith("#")) {
    // HEX格式
    let hex = color.slice(1);
    let r,
      g,
      b,
      a = 1;

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16) / 255;
      g = parseInt(hex[1] + hex[1], 16) / 255;
      b = parseInt(hex[2] + hex[2], 16) / 255;
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16) / 255;
      g = parseInt(hex.slice(2, 4), 16) / 255;
      b = parseInt(hex.slice(4, 6), 16) / 255;
    } else if (hex.length === 8) {
      r = parseInt(hex.slice(0, 2), 16) / 255;
      g = parseInt(hex.slice(2, 4), 16) / 255;
      b = parseInt(hex.slice(4, 6), 16) / 255;
      a = parseInt(hex.slice(6, 8), 16) / 255;
    }

    rgbToHsv(r, g, b);
    alpha.value = a;
    updateColorValue();
  } else if (color.startsWith("rgb")) {
    // RGB/RGBA格式
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/);
    if (match) {
      const r = parseInt(match[1]) / 255;
      const g = parseInt(match[2]) / 255;
      const b = parseInt(match[3]) / 255;
      const a = match[4] ? parseFloat(match[4]) : 1;

      rgbToHsv(r, g, b);
      alpha.value = a;
      updateColorValue();
    }
  }
}

/**
 * @description RGB转HSV
 * @param {number} r - 红色值 (0-1)
 * @param {number} g - 绿色值 (0-1)
 * @param {number} b - 蓝色值 (0-1)
 * @returns {void}
 */
function rgbToHsv(r: number, g: number, b: number): void {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  value.value = max;
  saturation.value = max === 0 ? 0 : d / max;

  if (max === min) {
    hue.value = 0;
  } else {
    switch (max) {
      case r:
        hue.value = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        hue.value = (b - r) / d + 2;
        break;
      case b:
        hue.value = (r - g) / d + 4;
        break;
    }
    hue.value /= 6;
  }
}

/**
 * @description HSV转RGB
 * @param {number} h - 色相值 (0-1)
 * @param {number} s - 饱和度值 (0-1)
 * @param {number} v - 明度值 (0-1)
 * @returns {string} RGB颜色字符串
 */
function hsvToRgb(h: number, s: number, v: number): string {
  let r = 0,
    g = 0,
    b = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  const rr = Math.round(r * 255);
  const gg = Math.round(g * 255);
  const bb = Math.round(b * 255);

  return `rgb(${rr}, ${gg}, ${bb})`;
}

/**
 * @description 格式化颜色值
 * @param {string} format - 颜色格式
 * @returns {string} 格式化后的颜色字符串
 */
function formatColor(format: string): string {
  // 使用标准的HSV到RGB转换方法，确保颜色一致性
  const rgb = hsvToRgb(hue.value, saturation.value, value.value);
  const rgbValues = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);

  if (!rgbValues) return rgb;

  const r = parseInt(rgbValues[1]);
  const g = parseInt(rgbValues[2]);
  const b = parseInt(rgbValues[3]);

  switch (format) {
    case "hex":
      return rgbToHex(r, g, b);
    case "rgb":
      return `rgb(${r}, ${g}, ${b})`;
    case "rgba":
      return `rgba(${r}, ${g}, ${b}, ${alpha.value})`;
    default:
      return `rgb(${r}, ${g}, ${b})`;
  }
}

/**
 * @description RGB转HEX
 * @param {number} r - 红色值 (0-255)
 * @param {number} g - 绿色值 (0-255)
 * @param {number} b - 蓝色值 (0-255)
 * @returns {string} HEX颜色字符串
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * @description 更新颜色值输入框
 * @returns {void}
 */
function updateColorValue(): void {
  colorValue.value = formatColor(props.colorFormat);
}

/**
 * @description 处理饱和度/明度区域鼠标按下
 * @param {MouseEvent} event - 鼠标事件
 * @returns {void}
 */
function handleSaturationMouseDown(event: MouseEvent): void {
  if (props.disabled) return;

  dragging.value = true;
  window.addEventListener("mousemove", handleSaturationMouseMove);
  window.addEventListener("mouseup", handleSaturationMouseUp);

  handleSaturationMouseMove(event);
}

/**
 * @description 处理饱和度/明度区域鼠标移动
 * @param {MouseEvent} event - 鼠标事件
 * @returns {void}
 */
function handleSaturationMouseMove(event: MouseEvent): void {
  if (!saturationRef.value) return;

  const rect = saturationRef.value.getBoundingClientRect();
  let left = event.clientX - rect.left;
  let top = event.clientY - rect.top;

  left = Math.max(0, Math.min(left, rect.width));
  top = Math.max(0, Math.min(top, rect.height));

  saturation.value = left / rect.width;
  value.value = 1 - top / rect.height;

  updateColorValue();
  emitColorChange();
}

/**
 * @description 处理饱和度/明度区域鼠标释放
 * @returns {void}
 */
function handleSaturationMouseUp(): void {
  dragging.value = false;
  window.removeEventListener("mousemove", handleSaturationMouseMove);
  window.removeEventListener("mouseup", handleSaturationMouseUp);
}

/**
 * @description 处理色相条鼠标按下
 * @param {MouseEvent} event - 鼠标事件
 * @returns {void}
 */
function handleHueMouseDown(event: MouseEvent): void {
  if (props.disabled) return;

  dragging.value = true;
  window.addEventListener("mousemove", handleHueMouseMove);
  window.addEventListener("mouseup", handleHueMouseUp);

  handleHueMouseMove(event);
}

/**
 * @description 处理色相条鼠标移动
 * @param {MouseEvent} event - 鼠标事件
 * @returns {void}
 */
function handleHueMouseMove(event: MouseEvent): void {
  if (!hueRef.value) return;

  const rect = hueRef.value.getBoundingClientRect();
  let left = event.clientX - rect.left;

  left = Math.max(0, Math.min(left, rect.width));

  hue.value = left / rect.width;

  updateColorValue();
  emitColorChange();
}

/**
 * @description 处理色相条鼠标释放
 * @returns {void}
 */
function handleHueMouseUp(): void {
  dragging.value = false;
  window.removeEventListener("mousemove", handleHueMouseMove);
  window.removeEventListener("mouseup", handleHueMouseUp);
}

/**
 * @description 处理透明度条鼠标按下
 * @param {MouseEvent} event - 鼠标事件
 * @returns {void}
 */
function handleAlphaMouseDown(event: MouseEvent): void {
  if (props.disabled || !props.showAlpha) return;

  dragging.value = true;
  window.addEventListener("mousemove", handleAlphaMouseMove);
  window.addEventListener("mouseup", handleAlphaMouseUp);

  handleAlphaMouseMove(event);
}

/**
 * @description 处理透明度条鼠标移动
 * @param {MouseEvent} event - 鼠标事件
 * @returns {void}
 */
function handleAlphaMouseMove(event: MouseEvent): void {
  if (!alphaRef.value) return;

  const rect = alphaRef.value.getBoundingClientRect();
  let left = event.clientX - rect.left;

  left = Math.max(0, Math.min(left, rect.width));

  alpha.value = left / rect.width;

  updateColorValue();
  emitColorChange();
}

/**
 * @description 处理透明度条鼠标释放
 * @returns {void}
 */
function handleAlphaMouseUp(): void {
  dragging.value = false;
  window.removeEventListener("mousemove", handleAlphaMouseMove);
  window.removeEventListener("mouseup", handleAlphaMouseUp);
}

/**
 * @description 处理颜色输入
 * @param {Event} event - 输入事件
 * @returns {void}
 */
function handleColorInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  parseColor(value);
  emitColorChange();
}

/**
 * @description 处理预定义颜色选择
 * @param {string} color - 选择的颜色值
 * @returns {void}
 */
function handlePredefineColorSelect(color: string): void {
  parseColor(color);
  updateColorValue();
  emitColorChange();
  handleConfirm();
}

/**
 * @description 处理清空
 * @returns {void}
 */
function handleClear(): void {
  colorModel.value = "";
  emit("change", "");
  visible.value = false;
}

/**
 * @description 处理确认
 * @returns {void}
 */
function handleConfirm(): void {
  const color = formatColor(props.colorFormat);
  colorModel.value = color;
  emit("change", color);
  visible.value = false;
}

/**
 * @description 处理触发器点击
 * @returns {void}
 */
function handleTriggerClick(): void {
  if (props.disabled) return;
  // TPopover 组件会自动处理 visible 的切换
}

/**
 * @description 处理获得焦点
 * @param {FocusEvent} event - 焦点事件
 * @returns {void}
 */
function handleFocus(event: FocusEvent): void {
  if (props.disabled) return;
  emit("focus", event);
}

/**
 * @description 处理失去焦点
 * @param {FocusEvent} event - 焦点事件
 * @returns {void}
 */
function handleBlur(event: FocusEvent): void {
  if (props.disabled) return;
  emit("blur", event);
}

/**
 * @description 发送颜色变化事件
 * @returns {void}
 */
function emitColorChange(): void {
  const color = formatColor(props.colorFormat);
  emit("active-change", color);
}

/**
 * @description 组件挂载 - 初始化颜色值
 * @returns {void}
 */
onMounted(() => {
  if (colorModel.value) {
    parseColor(colorModel.value);
  }
});

/**
 * @description 组件卸载前 - 清理事件监听器
 * @returns {void}
 */
onBeforeUnmount(() => {
  // 移除所有可能的事件监听器
  window.removeEventListener("mousemove", handleSaturationMouseMove);
  window.removeEventListener("mouseup", handleSaturationMouseUp);
  window.removeEventListener("mousemove", handleHueMouseMove);
  window.removeEventListener("mouseup", handleHueMouseUp);
  window.removeEventListener("mousemove", handleAlphaMouseMove);
  window.removeEventListener("mouseup", handleAlphaMouseUp);
});

// 对外暴露方法
defineExpose({
  handleTriggerClick
});
</script>
