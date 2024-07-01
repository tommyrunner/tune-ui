<template>
  <div class="t-carousel-group" ref="groupRef" :style="getStyle">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import type { ValueType } from './carousel'
import type { PropsType, EmitsType } from './carousel-group'
import { type GroupContextType, collapseGroupKey } from './constants'
import { type StyleValue, ref, provide, reactive, toRefs, nextTick, onMounted, computed } from 'vue'
defineOptions({ name: 'TCheckboxGroup' })
const props = withDefaults(defineProps<PropsType>(), {
  width: 300,
  height: 200,
  behavior: 'smooth',
  toggle: 'vision'
})
const emit = defineEmits<EmitsType>()
const groupRef = ref<HTMLElement>()
const model = defineModel<ValueType[]>()
const state = reactive({
  left: 0,
  top: 0
})
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
  }
  nextTick(() => emit('change', model.value))
}
onMounted(() => {
  const { width, toggle, behavior } = props
  const child = groupRef.value?.querySelectorAll('#_t-carousel')
  const el = groupRef.value
  const isVision = toggle === 'vision'
  // 控制repeatedly反复 方向
  let isRepeatedly = toggle === 'repeatedly'
  // vision模式克隆视觉组件
  if (isVision) {
    el.append(child[0].cloneNode(true))
  }
  const inter = setInterval(() => {
    // 当前处于最后一个
    const lastLeft = el.scrollLeft >= el.scrollWidth - width
    // 当前处于第一个
    const firstLeft = el.scrollLeft <= 0
    // 结束播放
    if (toggle === 'none' && lastLeft) {
      return clearInterval(inter)
    }
    // 到达克隆dom
    if (isVision && lastLeft) {
      el.scrollTo({
        left: 0
      })
    }
    // 重复
    if (toggle === 'repeat' && lastLeft) {
      el.scrollTo({
        left: 0,
        behavior: 'smooth'
      })
    }
    // 反复(相反方向)
    if (toggle === 'repeatedly') {
      if (lastLeft) isRepeatedly = false
      else if (firstLeft) isRepeatedly = true
      el.scrollBy({
        left: isRepeatedly ? width : -width,
        behavior: behavior
      })
    } else {
      el.scrollBy({
        left: width,
        behavior: behavior
      })
    }
  }, 1000)
})
const getStyle = computed((): StyleValue => {
  const { width, height } = props
  return {
    height: `${height}px`,
    width: `${width}px`
  }
})
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
@import './group.scss';
</style>
