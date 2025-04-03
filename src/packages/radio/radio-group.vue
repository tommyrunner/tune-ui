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

defineOptions({ name: "TRadioGroup" });

/** Props定义 */
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: "button",
  direction: "row"
});

/** Emits定义 */
const emit = defineEmits<EmitsType>();

/** 组件引用 */
const groupRef = ref<HTMLElement>();

/** 双向绑定 */
const model = defineModel<ValueType>();

/** 处理值改变事件 */
const handleChange = (value?: ValueType) => {
  model.value = value;
  nextTick(() => emit("change", model.value));
};

/** 初始化立即触发 */
onMounted(() => props.immediateChange && handleChange(model.value));

/** 提供上下文 */
provide<GroupContextType>(
  radioGroupKey,
  reactive({
    ...toRefs(props),
    model,
    changeEvent: handleChange
  })
);
</script>
