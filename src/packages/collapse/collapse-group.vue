<template>
  <div class="t-collapse" ref="groupRef">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import type { ValueType } from './collapse'
import type { PropsType, EmitsType } from './collapse-group'
import { type GroupContextType, collapseGroupKey } from './constants'
import { ref, provide, reactive, toRefs, nextTick } from 'vue'
defineOptions({ name: 'TCheckboxGroup' })
const props = withDefaults(defineProps<PropsType>(), {})
const emit = defineEmits<EmitsType>()
const groupRef = ref<HTMLElement>()
const model = defineModel<ValueType[]>()
/**
 * 子组件状态更新函数
 * @param isChecked 当前是否选中
 * @param item 子组件绑定value值
 */
const changeEvent = (isChecked?: boolean, item?: ValueType) => {
  if (!item || !model.value) return
  // 如果选中，则取消选中
  if (isChecked && model.value.includes(item)) {
    model.value = model.value.filter((v) => v !== item)
  } else {
    if (props.accordion) model.value = [item]
    else model.value.push(item)
  }
  nextTick(() => emit('change', model.value))
}
// 抛出操作api，与子组件交互
provide<GroupContextType>(
  collapseGroupKey,
  reactive({
    ...toRefs(props),
    model,
    changeEvent
  })
)
</script>
<style lang="scss" scoped>
.t-checkbox-group {
  display: flex;
  justify-content: start;
  align-items: start;
  cursor: pointer;
}
</style>
