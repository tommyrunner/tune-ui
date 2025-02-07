<template>
  <div class="t-collapse-group" ref="groupRef">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { ValueType } from "./collapse";
import type { PropsType, EmitsType } from "./collapse-group";
import type { GroupContextType } from "./constants";
import { ref, provide, reactive, toRefs, nextTick } from "vue";
import { collapseGroupKey } from "./constants";

defineOptions({ name: "TCollapseGroup" });

const props = withDefaults(defineProps<PropsType>(), {});
const emit = defineEmits<EmitsType>();
const model = defineModel<ValueType[]>();

const groupRef = ref<HTMLElement>();

/**
 * 处理状态更新
 */
const handleChange = (isChecked?: boolean, item?: ValueType) => {
  if (!item || !model.value) return;

  if (isChecked && model.value.includes(item)) {
    model.value = model.value.filter(v => v !== item);
  } else {
    if (props.accordion) {
      model.value = [item];
    } else {
      model.value.push(item);
    }
  }

  nextTick(() => emit("change", model.value));
};

/**
 * 提供上下文
 */
provide<GroupContextType>(
  collapseGroupKey,
  reactive({
    ...toRefs(props),
    model,
    changeEvent: handleChange
  })
);
</script>

<style lang="scss" scoped>
.t-collapse-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
