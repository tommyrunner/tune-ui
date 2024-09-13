<template>
  <div :class="getClass">
    <div class="_prefix">
      <slot name="prefix" />
    </div>
    <span class="_tip" v-if="getTip">{{ getTip }}</span>
    <input
      ref="inputRef"
      v-model="model"
      :type="getInputType"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :maxlength="props.maxlength"
      @focus="emit('focus', model)"
      @blur="emit('blur', model)"
      @keyup.enter="emit('enter', model)"
      @input="handleInput"
    />
    <transition name="right-icon">
      <div class="_right-icon" v-if="isRightIcon">
        <TIcon
          v-if="props.password"
          :icon="isPreview ? 'preview' : 'unpreview'"
          :color="defIconColor"
          :size="getIconSize"
          @click="isPreview = !isPreview"
        />
        <TIcon :size="getIconSize" v-if="props.clearable" icon="close-to" :color="defIconColor" @click="handleClear" />
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from "./input";
import type { ElSizeType } from "@/types";
import { configOptions } from "@/hooks/useOptions";
import { InputTypeHTMLAttribute, computed, ref } from "vue";
import { TIcon } from "../icon";
import { bindDebounce } from "@/utils";
defineOptions({ name: "TInput" });
const inputRef = ref();
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  debounce: undefined,
  isTipe: true,
  clearable: true,
  size: configOptions.value.elSize,
  disabled: false,
  debounceDelay: 1000
});
const model = defineModel<string>();
const isPreview = ref(false);

const getClass = computed(() => {
  const { size, password, clearable, disabled } = props;
  return [
    "t-input",
    `t-input-size-${size}`,
    password && "t-input-password",
    clearable && "t-input-clearable",
    disabled && "t-disabled"
  ];
});
const getTip = computed(() => {
  return props.isTipe && model.value && (props.placeholder || props.tip);
});
const getInputType = computed((): InputTypeHTMLAttribute => {
  return props.password && !isPreview.value ? "password" : "text";
});
const sizes: { [key in ElSizeType]: number } = {
  default: 16,
  small: 14,
  large: 18
};
const defIconColor = "#656a6e88";
const getIconSize = computed(() => {
  return sizes[props.size];
});
const isRightIcon = computed(() => {
  const { disabled, clearable, password } = props;
  return model.value && !disabled && (clearable || password);
});
const handleClear = () => {
  model.value = "";
  emit("clear");
};
// 输入处理
const handleInput = () => {
  emit("input", model.value);
  // 优化处理:如果没绑定防抖事件直接返回
  if (!props.debounce) return;
  // 防抖处理
  bindDebounce(props.debounce, props.debounceDelay, model.value);
};
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
