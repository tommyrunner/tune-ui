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
import { configOptions } from '@/hooks/useOptions'
import { type PropsType, type EmitsType } from './checkbox-group'
import { useVModel } from '@vueuse/core'
import { ref, provide, reactive, toRefs, nextTick, onMounted } from 'vue'
import { type GroupContextType, checkboxGroupKey } from './constants'
import { ValueType } from '..'
defineOptions({ name: 'TCheckboxGroup' })
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: 'button',
  direction: 'row'
})

const emit = defineEmits<EmitsType>()
const groupRef = ref<HTMLElement>()
const vis = useVModel(props, 'modelValue', emit)
/**
 * 子组件状态更新函数
 * @param isChecked 当前是否选中
 * @param item 子组件绑定value值
 */
const changeEvent = (isChecked?: boolean, item?: ValueType) => {
  if (!item || !vis.value) return
  // 如果选中，则取消选中
  if (isChecked) {
    // 获取当前是否已经选中(基础值/对象值)
    const isCheckedItem = props.objKey
      ? vis.value.some((v) => getItemByObjKey(v, item, true))
      : vis.value.includes(item as any)
        ? item
        : false
    if (isCheckedItem) {
      vis.value = vis.value.filter((v) => (props.objKey ? getItemByObjKey(v, item, false) : v === item))
    }
  } else vis.value.push(item)
  nextTick(() => emit('change', vis.value))
}
/**
 * 获取状态数据函数
 * @param model 当前对象
 * @param itemValue 判断对象
 * @param is 选中与非选中状态
 */
const getItemByObjKey = (model: any, itemValue: any, is: boolean) => {
  if (!props.objKey) return false
  return is ? model[props.objKey] === itemValue[props.objKey] : model[props.objKey] !== itemValue[props.objKey]
}
onMounted(() => props.immediateChange && changeEvent())
// 抛出操作api，与子组件交互
provide<GroupContextType>(
  checkboxGroupKey,
  reactive({
    ...toRefs(props),
    changeEvent
  })
)
</script>
<style lang="scss" scoped>
@import './checkbox-group.scss';
</style>
./checkbox-group
