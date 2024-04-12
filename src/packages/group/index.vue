<template>
  <div
    :class="['t-group']"
    :direction="props.direction"
    :style="{ flexDirection: props.direction }"
    :type="props.type"
    ref="groupRef"
    @click="handClick"
  >
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { configOptions } from '@/hooks/useOptions'
import { type PropsType, type EmitsType, type ValueType, _getAttribute } from './group'
import { useVModel } from '@vueuse/core'
import { ref, watch, onMounted } from 'vue'
defineOptions({ name: 'TGroup' })
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: 'button',
  direction: 'row'
})
const emit = defineEmits<EmitsType>()
const groupRef = ref<HTMLElement>()
const vis = useVModel(props, 'modelValue', emit)
watch(
  () => vis.value,
  (val) => updateValue(val, true)
)
/**
 * 事件捕捉处理子组件状态切换
 * @param e MouseEvent
 */
function handClick(e: MouseEvent) {
  let el = e.target as HTMLElement
  if (el) {
    // 如果点击的不是radio(可能是它的子元素)，获取最近的父元素
    if (!_getAttribute(el, 't-group')) el = el.offsetParent as HTMLElement
    if (_getAttribute(el, 't-group-disabled')) {
      // 处理对象类型
      if (props.data && props.objKey) {
        const key: string = props.objKey
        vis.value = props.data.find((item: any) => item[key] && String(item[key]) === _getAttribute(el, '_value'))
      } else vis.value = _getAttribute(el, '_value')
    }
  }
}
/**
 * 更新子元素状态
 * @param val 状态值
 * @param immediateChange 是否立即触发change事件
 */
function updateValue(val?: ValueType, immediateChange?: boolean) {
  const children: HTMLElement[] = Array.from(groupRef.value?.querySelectorAll<HTMLElement>('[t-group]') ?? [])
  children.forEach((chil) => {
    // 处理size
    chil.setAttribute('size', props.size)
    // 处理对象类型
    if (props.data && props.objKey && val) {
      const key: string = props.objKey
      chil.setAttribute('checked', String(_getAttribute(chil, '_value') === String((val as any)[key])))
    } else chil.setAttribute('checked', String(_getAttribute(chil, '_value') === String(val)))
  })
  if (immediateChange) emit('change', vis.value)
}
onMounted(() => updateValue(vis.value, props.immediateChange))
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
