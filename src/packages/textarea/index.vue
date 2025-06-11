<template>
  <div :class="textareaClasses" @click="updateCursor">
    <component :is="TipComponent" />
    <textarea
      ref="textareaRef"
      v-model="model"
      :placeholder="TEXT_PLACEHOLDER"
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
import "./index.scss";
import type { EmitsType, PropsType } from "./textarea";
import { computed, ref } from "vue";
import { configOptions, useOptions } from "@/hooks/useOptions";
import { isKeyboard, bindDebounce } from "@/utils";
import { useTip } from "@/hooks";
import { useI18nText } from "./i18n";

defineOptions({ name: "TTextarea" });

/** 基础尺寸 */
const { baseSize } = useOptions();

/** 文本域DOM引用 */
const textareaRef = ref();

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description 组件Props定义
 */
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

/** 国际化文本 */
const { TEXT_PLACEHOLDER } = useI18nText(props);

/**
 * @description v-model定义
 */
const model = defineModel<string>();

/** 提示组件 */
const TipComponent = useTip(props, model);

/** 光标位置 */
const cursor = ref(0);

/**
 * 计算文本域类名
 * @returns {string[]} 类名数组
 */
const textareaClasses = computed((): string[] => {
  const { isResize, disabled } = props;
  return [
    "t-textarea",
    `t-textarea-size-${baseSize.value}`,
    !disabled && isResize && "t-textarea-resize",
    disabled && "t-disabled"
  ];
});

/**
 * 计算计数器文本
 * @returns {string} 计数器文本
 */
const counterText = computed((): string => {
  return (props.isCursor ? `[${cursor.value}]` : "") + (model.value?.length + "/" + props.maxLength);
});

/**
 * 处理键盘事件
 * @param {KeyboardEvent} event - 键盘事件对象
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

/** 绑定防抖处理 */
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
