<template>
  <div :class="getGroupClass" :style="getGroupStyle">
    <div class="_action" :style="getActionStyle"></div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import type { PropsType, EmitsType } from './tabs-group'
import type { ValueType } from './tabs'
import { type GroupContextType, tabsGroupKey } from './constants'
import { provide, reactive, toRefs, computed, nextTick, StyleValue, onMounted, onDeactivated, watch } from 'vue'
defineOptions({ name: 'TTabsGroup' })
const padding = 4
const props = withDefaults(defineProps<PropsType>(), {
  height: '42px',
  type: 'line',
  gap: 8,
  actionDuration: 220
})
const model = defineModel<ValueType>()
const state = reactive({
  // 标记是否选中
  isChange: false,
  // 记录当前选中的元素
  childEl: void 0 as HTMLElement,
  actionPosition: {
    width: 20,
    left: 0,
    top: 0
  }
})
const emit = defineEmits<EmitsType>()
// 监听参数变化调整action位置
watch(
  () => props,
  () => updateAction,
  { deep: true }
)

const getGroupClass = computed(() => {
  const { type } = props
  return ['t-tabs-group', `t-tabs-type-${type}`]
})
const getGroupStyle = computed((): StyleValue => {
  const { height, gap, type } = props
  const isBorder = type === 'border'
  return {
    height,
    padding: `0px ${isBorder ? 0 : padding}px`,
    gap: `${gap}px`
  }
})
const getActionStyle = computed((): StyleValue => {
  const { left, width } = state.actionPosition
  return {
    transform: `translateX(${state.isChange ? left : -(width + padding)}px)`,
    width: `${width}px`,
    transition: `${props.actionDuration / 1000}s`
  }
})
/**
 * 修改action状态
 * @param el 更改组件
 * @param params 当前value参数
 * @param isChange 标记是否选中
 * @param isEmit 标记是否抛出
 */
const changeEvent = (childEl: HTMLElement, value?: ValueType, isChange?: boolean, isEmit: boolean = true) => {
  if (!childEl) return
  // 获取定位
  nextTick(() => {
    const { offsetLeft, offsetWidth } = childEl
    state.actionPosition.left = offsetLeft
    if (props.type !== 'border') state.actionPosition.left -= padding
    state.actionPosition.width = offsetWidth
    model.value = value
    state.isChange = isChange
    if (state.childEl !== childEl) state.childEl = childEl
    if (isEmit) emit('change', model.value)
  })
}
const updateAction = () => {
  if (state.childEl) changeEvent(state.childEl, model.value, true, false)
}
// 处理动画更新action位置
onMounted(() => {
  window.addEventListener('resize', updateAction)
  window.addEventListener('transitionend', updateAction)
})
onDeactivated(() => {
  window.removeEventListener('resize', updateAction)
  window.removeEventListener('transitionend', updateAction)
})

// 抛出操作api，与子组件交互
provide<GroupContextType>(
  tabsGroupKey,
  reactive({
    ...toRefs(props),
    model,
    changeEvent,
    handlerClose: (params?: ValueType) => {
      emit('close', params)
      // 删除更新view
      nextTick(() => {
        updateAction()
      })
    }
  })
)
defineExpose({
  updateAction
})
</script>
<style lang="scss" scoped>
@import './group.scss';
</style>
