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
      :placeholder="props.placeholder"
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
          :size="iconSize"
          @click="isPreview = !isPreview"
        />
        <t-icon v-if="props.clearable" icon="close-to" :color="defaultIconColor" :size="iconSize" @click="handleClear" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import type { EmitsType, PropsType } from "./input";
import type { ElSizeType } from "@/types";
import type { InputTypeHTMLAttribute } from "vue";
import { computed, ref } from "vue";
import { configOptions } from "@/hooks/useOptions";
import { TIcon } from "@/packages/icon";
import { bindDebounce } from "@/utils";
import { useTip } from "@/hooks";

defineOptions({ name: "TInput" });

const inputRef = ref();
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  placeholder: "请输入",
  debounce: void 0,
  isTip: true,
  clearable: true,
  size: configOptions.value.elSize,
  disabled: false,
  debounceDelay: 1000,
  autocomplete: "off"
});

const model = defineModel<string>();
const TipComponent = useTip(props, model);
const isPreview = ref(false);

/**
 * 计算输入框类名
 */
const inputClasses = computed(() => {
  const { size, password, clearable, disabled } = props;
  return [
    "t-input",
    `t-input-size-${size}`,
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

const iconSizes: { [key in ElSizeType]: number } = {
  default: 14,
  small: 14,
  large: 18
};

const defaultIconColor = "#656a6e56";

/**
 * 计算图标大小
 */
const iconSize = computed(() => {
  return iconSizes[props.size];
});

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

<style lang="scss" scoped>
@import "index.scss";
</style>
