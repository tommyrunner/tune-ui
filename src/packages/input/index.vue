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
import { ICON_SIZES } from "./input";
import { computed, ref } from "vue";
import { configOptions, useOptions } from "@/hooks/useOptions";
import { TIcon } from "@/packages/icon";
import { bindDebounce } from "@/utils";
import { useTip } from "@/hooks";
import { useI18nText } from "./i18n";

defineOptions({ name: "TInput" });

const inputRef = ref();
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  debounce: void 0,
  isTip: true,
  clearable: true,
  size: configOptions.value.elSize,
  disabled: false,
  debounceDelay: 1000,
  autocomplete: "off"
});

// 基础尺寸
const { baseSize } = useOptions(props);

const { TEXT_PLACEHOLDER } = useI18nText(props);

const model = defineModel<string>();
const TipComponent = useTip(props, model);
const isPreview = ref(false);

/**
 * 计算输入框类名
 */
const inputClasses = computed(() => {
  const { password, clearable, disabled } = props;
  return [
    "t-input",
    `t-input-size-${baseSize.value}`,
    password && "t-input-password",
    clearable && "t-input-clearable",
    disabled && "t-disabled"
  ];
});

/**
 * 计算输入框类型
 */
const inputType = computed((): InputTypeHTMLAttribute => {
  return props.password && !isPreview.value ? "password" : "text";
});

const defaultIconColor = "#656a6e56";

/**
 * 是否显示右侧图标
 */
const showRightIcon = computed(() => {
  const { disabled, clearable, password } = props;
  return model.value && !disabled && (clearable || password);
});

/**
 * 处理清除内容
 */
const handleClear = () => {
  model.value = "";
  emit("clear");
};

// 绑定防抖处理
const debounce = bindDebounce(props.debounce, props.debounceDelay);

/**
 * 处理输入事件
 */
const handleInput = () => {
  emit("input", model.value);
  if (!props.debounce) return;
  debounce(model.value);
};
</script>
