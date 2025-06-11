<template>
  <div
    class="t-checkbox-group"
    :direction="props.direction"
    :style="{ flexDirection: props.direction }"
    :type="props.type"
    ref="groupRef"
  >
    <slot />
  </div>
</template>
<script lang="ts" setup>
import "./checkbox-group.scss";

import type { ValueType } from "./checkbox";
import type { PropsType, EmitsType } from "./checkbox-group";
import { type GroupContextType, checkboxGroupKey } from "./constants";

import { ref, provide, reactive, toRefs, nextTick, onMounted } from "vue";
import { configOptions } from "@/hooks/useOptions";

defineOptions({ name: "TCheckboxGroup" });

const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: "button",
  direction: "row"
});

const emit = defineEmits<EmitsType>();

const groupRef = ref<HTMLElement>();

const model = defineModel<ValueType[]>();

/**
 * @description 子组件状态更新函数
 * @param {boolean} isChecked 当前是否选中
 * @param {ValueType} item 子组件绑定value值
 * @returns {void}
 */
const changeEvent = (isChecked?: boolean, item?: ValueType): void => {
  if (!item || !model.value) return;
  // 如果选中，则取消选中
  if (isChecked) {
    // 获取当前是否已经选中(基础值/对象值)
    const isCheckedItem = props.objKey
      ? model.value.some(v => getItemByObjKey(v, item, true))
      : model.value.includes(item as any)
        ? item
        : false;
    if (isCheckedItem) {
      model.value = model.value.filter(v => (props.objKey ? getItemByObjKey(v, item, false) : v !== item));
    }
  } else model.value.push(item);
  nextTick(() => emit("change", model.value));
};

/**
 * @description 获取状态数据函数
 * @param {any} model 当前对象
 * @param {any} itemValue 判断对象
 * @param {boolean} is 选中与非选中状态
 * @returns {boolean} 比较结果
 */
const getItemByObjKey = (model: any, itemValue: any, is: boolean): boolean => {
  if (!props.objKey) return false;
  return is ? model[props.objKey] === itemValue[props.objKey] : model[props.objKey] !== itemValue[props.objKey];
};

onMounted(() => props.immediateChange && changeEvent());

// 抛出操作api，与子组件交互
provide<GroupContextType>(
  checkboxGroupKey,
  reactive({
    ...toRefs(props),
    model,
    changeEvent
  })
);
</script>
