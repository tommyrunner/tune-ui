<template>
  <div
    class="t-radio-group"
    :direction="props.direction"
    :style="{ flexDirection: props.direction }"
    :type="props.type"
    ref="groupRef"
  >
    <div class="_action" :style="getActionStyle"></div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import type { PropsType, EmitsType } from './tabs-group'
import type { ValueType } from './tabs'
import { type GroupContextType, radioGroupKey } from './constants'
import { configOptions } from '@/hooks/useOptions'
import { ref, provide, reactive, toRefs, nextTick, computed, StyleValue } from 'vue'
defineOptions({ name: 'TRadioGroup' })
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: 'button',
  direction: 'row'
})
const state = reactive({
  actionPosition: {
    width: 20,
    left: 0,
    top: 0
  }
})
const emit = defineEmits<EmitsType>()
const groupRef = ref<HTMLElement>()
const model = defineModel<ValueType>()
const getActionStyle = computed((): StyleValue => {
  const { left, width } = state.actionPosition
  return {
    transform: `translateX(${left}px)`,
    width: `${width}px`
  }
})

const changeEvent = (childEl: HTMLElement, value?: ValueType) => {
  // 获取定位
  const { offsetLeft, offsetWidth } = childEl
  state.actionPosition.left = offsetLeft - 2 - 6
  state.actionPosition.width = offsetWidth
  model.value = value
  nextTick(() => emit('change', model.value))
}

// 抛出操作api，与子组件交互
provide<GroupContextType>(
  radioGroupKey,
  reactive({
    ...toRefs(props),
    model,
    changeEvent
  })
)
</script>
<style lang="scss" scoped>
@import './group.scss';
</style>
