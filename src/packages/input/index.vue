<template>
  <div :class="inputClasses">
    <div class="_prefix">
      <slot name="prefix" />
    </div>
    <component :is="TipComponent" />
    <input
      ref="inputRef"
      v-model="model"
      :type="inputType"
      :placeholder="TEXT_PLACEHOLDER"
      :disabled="props.disabled"
      :maxlength="props.maxLength"
      :autocomplete="props.autocomplete"
      @focus="emit('focus', model)"
      @blur="emit('blur', model)"
      @keyup.enter="emit('enter', model)"
      @input="handleInput"
    />
    <transition name="right-icon">
      <div class="_right-icon" v-if="showRightIcon">
        <t-icon
          v-if="props.password"
          :icon="isPreview ? 'preview' : 'unpreview'"
          :color="defaultIconColor"
          :size="ICON_SIZES[baseSize]"
          @click="isPreview = !isPreview"
        />
        <t-icon
          v-if="props.clearable"
          icon="close-to"
          :color="defaultIconColor"
          :size="ICON_SIZES[baseSize]"
          @click="handleClear"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";

import type { EmitsType, PropsType } from "./input";
import type { InputTypeHTMLAttribute } from "vue";

import { computed, ref } from "vue";
import { ICON_SIZES } from "./input";
import { configOptions, useOptions } from "@/hooks/useOptions";
import { TIcon } from "@/packages/icon";
import { bindDebounce } from "@/utils";
import { useTip } from "@/hooks";
import { useI18nText } from "./i18n";

defineOptions({ name: "TInput" });

/**
 * @description DOM引用
 */
const inputRef = ref();

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  debounce: void 0,
  isTip: true,
  clearable: true,
  size: configOptions.value.elSize,
  disabled: false,
  debounceDelay: 1000,
  autocomplete: "off"
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
const model = defineModel<string>();

/**
 * @description 提示组件
 */
const TipComponent = useTip(props, model);

/**
 * @description 密码预览状态
 */
const isPreview = ref(false);

/**
 * @description 计算输入框类名
 * @returns {Array<string>} 类名数组
 */
const inputClasses = computed((): Array<string> => {
  const { password, clearable, disabled } = props;
  return [
    "t-input",
    `t-input-size-${baseSize.value}`,
    password && "t-input-password",
    clearable && "t-input-clearable",
    disabled && "t-disabled"
  ].filter(Boolean);
});

/**
 * @description 计算输入框类型
 * @returns {InputTypeHTMLAttribute} 输入框类型
 */
const inputType = computed((): InputTypeHTMLAttribute => {
  return props.password && !isPreview.value ? "password" : "text";
});

/**
 * @description 默认图标颜色
 */
const defaultIconColor = "#656a6e56";

/**
 * @description 是否显示右侧图标
 * @returns {boolean} 是否显示
 */
const showRightIcon = computed((): boolean => {
  const { disabled, clearable, password } = props;
  return model.value && !disabled && (clearable || password);
});

/**
 * @description 处理清除内容
 * @returns {void}
 */
const handleClear = (): void => {
  model.value = "";
  emit("clear");
};

/**
 * @description 绑定防抖处理
 */
const debounce = bindDebounce(props.debounce, props.debounceDelay);

/**
 * @description 处理输入事件
 * @returns {void}
 */
const handleInput = (): void => {
  emit("input", model.value);
  if (!props.debounce) return;
  debounce(model.value);
};
</script>
