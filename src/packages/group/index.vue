<template>
  <div class="t-group" ref="groupRef" @click="handClick">
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
  (val) => updateState(val)
)
function handClick(e: MouseEvent) {
  const el = (e.target as HTMLElement)?.offsetParent
  if (!el || !_getAttribute(el, 't-group')) return
  vis.value = _getAttribute(el, '_value')
}
function updateState(val?: string | null) {
  const children: HTMLElement[] = [...groupRef.value.children]
  children.forEach((chil) => {
    chil.setAttribute('checked', String(_getAttribute(chil, '_value') === val))
  })
}
nextTick(() => updateState(vis.value))
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
