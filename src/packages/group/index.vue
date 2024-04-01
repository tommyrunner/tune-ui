<template>
  <div
    class="t-group"
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
import { type PropsType, type EmitsType, _getAttribute } from './group'
import { useVModel } from '@vueuse/core'
import { ref, nextTick, watch } from 'vue'
defineOptions({ name: 'TGroup' })
const props = withDefaults(defineProps<PropsType>(), {})
const emit = defineEmits<EmitsType>()
const groupRef = ref()
const vis = useVModel(props, 'modelValue', emit)
watch(
  () => vis.value,
  (val) => updateValue(val)
)
function handClick(e: MouseEvent) {
  let el = e.target as HTMLElement
  if (el) {
    // 如果点击的不是radio(可能是它的子元素)，获取最近的父元素
    if (!_getAttribute(el, 't-group')) el = el.offsetParent as HTMLElement
    if (_getAttribute(el, 't-group')) vis.value = _getAttribute(el, '_value')
  }
}
function updateValue(val?: string | null) {
  const children: HTMLElement[] = [...groupRef.value.children]
  children.forEach((chil) => {
    chil.setAttribute('checked', String(_getAttribute(chil, '_value') === val))
  })
}
nextTick(() => updateValue(vis.value))
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
