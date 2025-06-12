<template>
  <div
    class="t-radio-group"
    :direction="props.direction"
    :style="{ flexDirection: props.direction }"
    :type="props.type"
    ref="groupRef"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import "./radio-group.scss";
import type { PropsType, EmitsType } from "./radio-group";
import type { ValueType } from "./radio";
import type { GroupContextType } from "./constants";
import { ref, provide, reactive, toRefs, nextTick, onMounted } from "vue";
import { radioGroupKey } from "./constants";
import { configOptions } from "@/hooks/useOptions";

/**
 * @description 单选框组组件
 */
defineOptions({ name: "TRadioGroup" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: "button",
  direction: "row"
});

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description 组件引用
 */
const groupRef = ref<HTMLElement>();

/**
 * @description v-model定义
 */
const model = defineModel<ValueType>();

/**
 * @description 处理值改变事件
 * @param {ValueType} value - 选中值
 */
const handleChange = (value?: ValueType) => {
  model.value = value;
  // 触发change事件
  nextTick(() => emit("change", model.value));
};

/**
 * @description 初始化立即触发
 */
onMounted(() => props.immediateChange && handleChange(model.value));

/**
 * @description 提供上下文
 */
provide<GroupContextType>(
  radioGroupKey,
  reactive({
    ...toRefs(props),
    model,
    changeEvent: handleChange
  })
);
</script>
