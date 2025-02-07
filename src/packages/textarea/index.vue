<template>
  <div :class="textareaClasses" @click="updateCursor">
    <component :is="TipComponent" />
    <textarea
      ref="textareaRef"
      v-model="model"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :maxlength="props.maxLength"
      @focus="emit('focus', model)"
      @blur="handleBlur"
      @keyup="handleKeyup"
      @input="handleInput"
    />
    <div class="_counter" v-if="props.maxLength">
      <span>{{ counterText }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { EmitsType, PropsType } from "./textarea";

import { computed, ref } from "vue";
import { configOptions } from "@/hooks/useOptions";
import { isKeyboard, bindDebounce } from "@/utils";
import { useTip } from "@/hooks";

defineOptions({ name: "TTextarea" });

const textareaRef = ref();
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  debounce: undefined,
  isTip: true,
  size: configOptions.value.elSize,
  isEnter: true,
  disabled: false,
  isResize: true,
  isCursor: true,
  debounceDelay: 1000
});

const model = defineModel<string>();
const TipComponent = useTip(props, model);
const cursor = ref(0);

/**
 * 计算文本域类名
 */
const textareaClasses = computed(() => {
  const { isResize, disabled } = props;
  return ["t-textarea", !disabled && isResize && "t-textarea-resize", disabled && "t-disabled"];
});

/**
 * 计算计数器文本
 */
const counterText = computed(() => {
  return (props.isCursor ? `[${cursor.value}]` : "") + (model.value?.length + "/" + props.maxLength);
});

/**
 * 处理键盘事件
 */
const handleKeyup = (event: KeyboardEvent) => {
  if (isKeyboard(event, "enter")) {
    emit("enter", model.value);
  }
  updateCursor();
};

/**
 * 处理失去焦点
 */
const handleBlur = () => {
  cursor.value = 0;
  emit("blur", model.value);
};

/**
 * 更新光标位置
 */
const updateCursor = () => {
  if (!model.value) return;
  const index = textareaRef.value.selectionStart;
  const startText = model.value.slice(0, index);
  cursor.value = startText.split("\n").length;
};

// 绑定防抖处理
const debounce = bindDebounce(props.debounce, props.debounceDelay);

/**
 * 处理输入事件
 */
const handleInput = () => {
  const value = model.value;

  // 限制换行
  if (!props.isEnter && value && value.includes("\n")) {
    model.value = value.replace("\n", "");
    return;
  }

  // 限制长度
  if (value && props.maxLength && value.length > props.maxLength) {
    model.value = value.slice(0, props.maxLength);
    return;
  }

  emit("input", value);
  if (!props.debounce) return;
  debounce(model.value);
};
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
