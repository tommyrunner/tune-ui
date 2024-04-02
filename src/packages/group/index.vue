<template>
  <div
    :class="['t-group', `t-group-size-${props.size}`]"
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
import { baseProps } from '@/utils'
import { type PropsType, type EmitsType, _getAttribute } from './group'
import { useVModel } from '@vueuse/core'
import { ref, nextTick, watch } from 'vue'
defineOptions({ name: 'TGroup' })
const props = withDefaults(
  defineProps<PropsType>(),
  baseProps<PropsType>({
    type: 'button',
    direction: 'row'
  })
)
const emit = defineEmits<EmitsType>()
const groupRef = ref()
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
    if (_getAttribute(el, 't-group')) vis.value = _getAttribute(el, '_value')
  }
}
/**
 * 更新子元素状态
 * @param val 状态值
 * @param immediateChange 是否立即触发change事件
 */
function updateValue(val?: string | number | boolean, immediateChange?: boolean) {
  const children: HTMLElement[] = [...groupRef.value.children]
  children.forEach((chil) => {
    chil.setAttribute('checked', String(_getAttribute(chil, '_value') === val))
  })
  if (immediateChange) emit('change', vis.value)
}
nextTick(() => updateValue(vis.value, props.immediateChange))
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
