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
      :maxlength="props.maxLength"
      @focus="handlerActive(true)"
      @blur="handlerActive(false)"
      @keyup.enter="emit('enter', model)"
      @input="handleInput"
    />
    <div class="_right-icon">
      <TIcon
        :class="state.active ? '_icon-active' : ''"
        :size="getIconSize"
        :icon="closeIconShow ? 'close-to' : 'caret-down'"
        :color="defIconColor"
        @click="handleClear"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from "./select";
import type { ElSizeType } from "@/types";
import { configOptions } from "@/hooks/useOptions";
import { InputTypeHTMLAttribute, computed, reactive, ref } from "vue";
import { TIcon } from "../icon";
import { bindDebounce } from "@/utils";
defineOptions({ name: "TInput" });
const inputRef = ref();
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  debounce: undefined,
  isTip: true,
  clearable: true,
  size: configOptions.value.elSize,
  disabled: false,
  debounceDelay: 1000
});
const model = defineModel<string>("");
const state = reactive({
  active: false
});
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
  return props.isTip && model.value && (props.placeholder || props.tip);
});
const getInputType = computed((): InputTypeHTMLAttribute => {
  return props.password && !isPreview.value ? "password" : "text";
});
const closeIconShow = computed((): boolean => {
  return props.clearable && model.value ? true : false;
});
const sizes: { [key in ElSizeType]: number } = {
  default: 14,
  small: 14,
  large: 18
};
const defIconColor = "#656a6e56";
const getIconSize = computed(() => {
  return sizes[props.size];
});
const handlerActive = (is: boolean) => {
  state.active = is;
};
const handleClear = () => {
  if (!props.clearable) return;
  model.value = "";
  emit("clear");
};
// 防抖事件
const debounce = bindDebounce(props.debounce, props.debounceDelay);
// 输入处理
const handleInput = () => {
  emit("input", model.value);
  // 优化处理:如果没绑定防抖事件直接返回
  if (!props.debounce) return;
  // 防抖处理
  debounce(model.value);
};
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
