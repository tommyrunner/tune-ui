<template>
  <div :class="switchClasses" @click="handleClick">
    <div class="_bg _bg1" :style="{ backgroundColor: props.offBgColor }">
      <slot name="offContent" />
    </div>
    <div class="_bg _bg2" :style="{ backgroundColor: props.onBgColor }">
      <slot name="onContent" />
    </div>
    <div class="_action">
      <t-icon v-if="props.loading" icon="loading" :class="`${props.loading && 't-loading'}`" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { EmitsType, PropsType } from "./switch";
import { computed } from "vue";
import { configOptions, useOptions } from "@/hooks/useOptions";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TSwitch" });

/** Props定义 */
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  loading: false,
  disabled: false
});

// 基础尺寸
const { baseSize } = useOptions(props);

/** Emits定义 */
const emit = defineEmits<EmitsType>();

/** 双向绑定 */
const model = defineModel<boolean>();

/** 计算开关样式 */
const switchClasses = computed(() => {
  const { radius, disabled, loading } = props;
  return [
    "t-switch",
    `t-switch-${model.value ? "on" : "off"}`,
    `t-switch-size-${baseSize.value}`,
    `t-switch-radius-${radius}`,
    (disabled || loading) && "t-disabled"
  ];
});

/** 处理点击事件 */
const handleClick = () => {
  if (!props.disabled && !props.loading) {
    model.value = !model.value;
    emit("change", model.value);
  }
};
</script>
