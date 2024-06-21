<template>
  <div
    :style="{ gap: `${props.gap}px` }"
    :class="getClass"
    @mouseenter="handlerParent(true)"
    @mouseleave="handlerParent(false)"
  >
    <TIcon
      @mouseenter="handlerMouseenter(i)"
      @mousemove="handlerMousemove($event, i)"
      @click="handlerClick"
      :icon="getIcon(i)"
      :color="getColor"
      v-for="i in props.max"
      :key="i"
      :size="getSize"
    />
  </div>
</template>
<script lang="ts" setup>
import { configOptions } from '@/hooks/useOptions'
import type { EmitsType, PropsType } from './rate'
import { computed, ref } from 'vue'
import { TIcon } from '..'
defineOptions({ name: 'TRate' })
const emit = defineEmits<EmitsType>()
const model = defineModel<number>()
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  max: 5,
  gap: 5,
  disabled: false
})
const getColor = computed(() => {
  if (!props.color) return '#f4ba3b'
  const value = showModel.value || model.value
  const keys = Object.keys(props.color)
  for (let i = keys.length - 1; i > 0; i--) {
    if (value >= Number(keys[i])) return props.color[keys[i]]
  }
  return '#f4ba3b'
})
const sizes = {
  default: 16,
  small: 14,
  large: 18
}
const getSize = computed(() => {
  return sizes[props.size]
})
const showModel = ref(model.value)
const isHoverParent = ref(false)
const getClass = computed(() => {
  const { disabled } = props
  return ['t-rate', disabled && 'is-disabled']
})
// 根据不同情况小时icon
const getIcon = (i: number) => {
  const value = showModel.value || model.value
  const { empty, half, show } = props.icon || {}
  // 如果有自定义icon优先使用自定义icon
  const defIcon = empty || half || show
  // 配置三种情况icon,默认值优先级:自定义>其他自定义>默认icon
  const icon = {
    empty: empty || defIcon || 'rate-null',
    half: half || defIcon || 'rate-half',
    show: show || defIcon || 'rate'
  }
  // 根据位置以及值判断显示图标，并实现半值
  return value >= i - 0.5 ? (props.isHalf && value === i - 0.5 ? icon.half : icon.show) : icon.empty
}
// 刚进入icon的showModel记录
const handlerMouseenter = (index: number) => {
  showModel.value = index
}
// icon的移动记录值
const handlerMousemove = (event: MouseEvent, index: number) => {
  const target = event.target as HTMLDivElement
  const { left, width } = target.getBoundingClientRect()
  // 得到一个中间值
  const centerX = left + width / 2
  // 判断左右
  showModel.value = event.clientX < centerX ? index - 0.5 : index
}
// 父容器离开时需要初始化 showModel
const handlerParent = (is: boolean) => {
  isHoverParent.value = is
  if (!is) showModel.value = 0
}
// 点击确定绑定值
const handlerClick = () => {
  if (model.value === showModel.value) {
    model.value = 0
    showModel.value = 0
  } else model.value = showModel.value
  emit('change', model.value)
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
