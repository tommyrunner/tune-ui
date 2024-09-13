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
import type { PropsType, EmitsType } from "./radio-group";
import type { ValueType } from "./radio";
import { type GroupContextType, radioGroupKey } from "./constants";
import { configOptions } from "@/hooks/useOptions";
import { ref, provide, reactive, toRefs, nextTick, onMounted } from "vue";
defineOptions({ name: "TRadioGroup" });
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: "button",
  direction: "row"
});

const emit = defineEmits<EmitsType>();
const groupRef = ref<HTMLElement>();
const model = defineModel<ValueType>();
const changeEvent = (value?: ValueType) => {
  model.value = value;
  nextTick(() => emit("change", model.value));
};
onMounted(() => props.immediateChange && changeEvent(model.value));
// 抛出操作api，与子组件交互
provide<GroupContextType>(
  radioGroupKey,
  reactive({
    ...toRefs(props),
    model,
    changeEvent
  })
);
</script>
<style lang="scss" scoped>
.t-radio-group {
  display: flex;
  justify-content: start;
  align-items: start;
  cursor: pointer;
}
</style>
