<template>
  <div :class="inputNumberClasses">
    <div class="_range-item" v-for="index in props.isRange ? 2 : 1" :key="index">
      <!-- 提示组件 -->
      <component :is="TipComponent" />

      <!-- 数值输入框 -->
      <input
        :value="props.isRange ? model[index - 1] : model"
        type="number"
        :placeholder="TEXT_PLACEHOLDER"
        :disabled="props.disabled"
        :step="props.step"
        :max="props.maxValue"
        :min="props.minValue"
        ref="inputRefs"
        @focus="emit('focus', model)"
        @blur="emit('blur', model)"
        @keyup.enter="emit('enter', model)"
        @input="handleInput($event.target as HTMLInputElement, index - 1)"
      />

      <!-- 步进控制按钮 -->
      <transition name="right-icon">
        <div class="_right-icon" v-if="props.isControls && !props.isRange">
          <t-icon icon="caret-up" :color="defaultIconColor" :size="ICON_SIZES[baseSize]" @click="handleStepChange(true)" />
          <t-icon icon="caret-down" :color="defaultIconColor" :size="ICON_SIZES[baseSize]" @click="handleStepChange(false)" />
        </div>
      </transition>

      <!-- 范围输入分隔符 -->
      <div class="_spe" v-if="index !== 2 && props.isRange">
        <slot name="spe">
          <t-icon icon="minus" :color="defaultIconColor" :size="ICON_SIZES[baseSize]" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";

import type { EmitsType, ModelType, PropsType } from "./input-number";

import { computed, ref, watch } from "vue";
import { ICON_SIZES } from "./input-number";
import { configOptions, useOptions } from "@/hooks/useOptions";
import { bindDebounce } from "@/utils";
import { useTip } from "@/hooks";
import { TIcon } from "@/packages/icon";
import { isValue } from "@/utils/is";
import { useI18nText } from "./i18n";

defineOptions({ name: "TInputNumber" });

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  isTip: true,
  isControls: true,
  step: 1,
  debounceDelay: 1000
});

/**
 * @description 基础尺寸
 */
const { baseSize } = useOptions(props);

/**
 * @description 国际化文本
 */
const { TEXT_PLACEHOLDER } = useI18nText(props);

/**
 * @description v-model定义
 */
const model = defineModel<ModelType>();

/**
 * @description 提示组件
 */
const TipComponent = useTip(props, model);

/**
 * @description 输入框引用
 */
const inputRefs = ref<(HTMLInputElement | null)[]>([]);

/**
 * @description 默认图标颜色
 */
const defaultIconColor = "#656a6e88";

/**
 * @description 计算组件类名
 * @returns {Array<string>} 组件的类名数组
 */
const inputNumberClasses = computed((): Array<string> => {
  const { disabled, isRange, isControls } = props;
  return [
    "t-input-number",
    `t-input-number-size-${baseSize.value}`,
    isRange && "t-input-number-range",
    isControls && "t-input-number-controls",
    disabled && "t-disabled"
  ].filter(Boolean);
});

/**
 * @description 检查并限制值的范围
 * HTML input 的 max/min 属性只会在用户手动输入时进行限制
 * 需要在 JS 层面进行额外的范围检查
 * @param {number} value - 需要检查的值
 * @returns {number} 限制在有效范围内的值
 */
const checkValueRange = (value: number): number => {
  const { minValue, maxValue } = props;
  return Math.min(Math.max(value, minValue ?? -Infinity), maxValue ?? Infinity);
};

/**
 * @description 更新输入框显示的值
 * 由于 HTML input 的限制，需要手动同步显示值
 * @param {number} index - 输入框索引
 * @param {number} value - 需要显示的值
 * @returns {void}
 */
const updateInputValue = (index: number, value: number): void => {
  const input = inputRefs.value[index];
  if (!input) return;
  input.value = String(value);
};

/**
 * @description 处理步进变化
 * @param {boolean} isIncrease - 是否增加值
 * @returns {void}
 */
const handleStepChange = (isIncrease: boolean): void => {
  if (props.disabled) return;

  const currentValue = model.value as number;
  const newValue = isIncrease ? currentValue + props.step : currentValue - props.step;
  model.value = checkValueRange(newValue);
  emit("input", model.value);
};

/**
 * @description 绑定防抖处理
 */
const debounce = bindDebounce(props.debounce, props.debounceDelay);

/**
 * @description 处理输入事件
 * @param {HTMLInputElement} target - 输入框元素
 * @param {number} index - 输入框索引
 * @returns {void}
 */
const handleInput = (target: HTMLInputElement, index: number): void => {
  const value = Number(target.value);

  // 处理范围输入和单值输入
  if (props.isRange) {
    const values = [...(model.value as number[])];
    values[index] = checkValueRange(value);
    model.value = values;
    // 同步输入框显示值
    updateInputValue(index, model.value[index]);
  } else {
    model.value = checkValueRange(value);
    // 同步输入框显示值
    updateInputValue(index, model.value);
  }

  emit("input", model.value);

  // 处理防抖回调
  if (props.debounce) {
    debounce(value);
  }
};

/**
 * @description 监听值变化，处理输入
 */
watch(
  () => model.value,
  (newVal: ModelType): void => {
    if (!isValue(newVal)) return;

    // 如果输入字符串，转换为数字处理
    if (typeof newVal === "string") {
      handleInput(inputRefs.value[0] as HTMLInputElement, 0);
    }
  }
);
</script>
