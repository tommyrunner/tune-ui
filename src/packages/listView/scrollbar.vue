<template>
  <div
    :class="['_scrollbar', '_scrollbar-v', state.scrollbar.isMove && '_scrollbar-notMove']"
    @mousedown="(event: MouseEvent) => handlerScrollbarClick(event, 'top')"
    ref="scrollbarVRef"
  >
    <div class="_scrollbar-thumb" @mousedown="handlerOpenMove" :style="getScrollbarThumbVStyle"></div>
  </div>
  <div
    :class="['_scrollbar', '_scrollbar-h', state.scrollbar.isMove && '_scrollbar-notMove']"
    @mousedown="(event: MouseEvent) => handlerScrollbarClick(event, 'left')"
    ref="scrollbarHRef"
  >
    <div class="_scrollbar-thumb" @mousedown="handlerOpenMove" :style="getScrollbarThumbHStyle"></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, nextTick, onDeactivated, reactive, ref, StyleValue, watch } from 'vue'
import { ScrollbarType } from './listView'

const scrollbarVRef = ref<HTMLDivElement>()
const scrollbarHRef = ref<HTMLDivElement>()
const props = withDefaults(defineProps<ScrollbarType.PropsType>(), {})

const state = reactive({
  height: 0,
  width: 0,
  // 当前滚动位置
  scrollTop: 0,
  scrollLeft: 0,
  // 总高度
  totalHeight: 0,
  totalWidth: 0,
  // listView当前处于位置
  point: {
    x: 0,
    y: 0
  },
  // 滚动条
  scrollbar: {
    // 拖动方向
    direction: 'top' as ScrollbarType.DirectionType,
    // 滚动条高度
    height: 0,
    width: 0,
    // 当前是否处于拖动
    isMove: false
  }
})
watch(
  () => props.totalHeight,
  () => {
    updatePoint()
  }
)
nextTick(() => {
  window.addEventListener('mousemove', handlerScrollbarMover)
  window.addEventListener('mouseup', handlerCloseMove)
  window.addEventListener('mouseleave', handlerCloseMove)
  const view = props.view
  view.addEventListener('scroll', handlerViewScrollbar)
  updatePoint()
})
// 清理：移除滚动监听器
onDeactivated(() => {
  window.removeEventListener('mousemove', handlerScrollbarMover)
  window.removeEventListener('mouseup', handlerCloseMove)
  window.removeEventListener('mouseleave', handlerCloseMove)
  if (props.view) props.view.removeEventListener('scroll', handlerViewScrollbar)
})
const updatePoint = () => {
  const view = props.view
  if (!view) return
  state.height = view.offsetHeight
  state.width = view.offsetWidth
  state.totalHeight = view.scrollHeight
  state.totalWidth = view.scrollWidth
  // 指定高度
  if (props.totalHeight) state.totalHeight = props.totalHeight
  // 计算滚动条高度
  state.scrollbar.height = state.height * (state.height / state.totalHeight) - 4
  state.scrollbar.width = view.clientWidth * (view.clientWidth / view.scrollWidth) - 4
}

const handlerScrollbarClick = (event: MouseEvent, direction: ScrollbarType.DirectionType) => {
  event.preventDefault()
  //   计算当前位置
  const rect = props.view.getBoundingClientRect()
  state.point = {
    x: rect.left,
    y: rect.top
  }
  state.scrollbar.direction = direction
  const mobile = direction === 'left' ? event.layerX : event.layerY
  updateScrollbar(mobile, direction)
}
const handlerScrollbarMover = (event: MouseEvent) => {
  if (state.scrollbar.isMove) {
    const { scrollbar, point } = state
    const pageVal = scrollbar.direction === 'left' ? event.clientX : event.clientY
    const pointVal = scrollbar.direction === 'left' ? point.x : point.y
    updateScrollbar(pageVal - pointVal - 4, state.scrollbar.direction)
  }
  return false
}
const handlerCloseMove = () => {
  state.scrollbar.isMove = false
  //   props.view.style.userSelect = 'auto'
}
const handlerOpenMove = () => {
  state.scrollbar.isMove = true
  //   props.view.style.userSelect = 'none'
}
const handlerViewScrollbar = () => {
  state.scrollTop = props.view.scrollTop
  state.scrollLeft = props.view.scrollLeft
}
const updateScrollbar = (mobile: number, direction: ScrollbarType.DirectionType) => {
  const view = props.view
  const scrollbarRef = direction === 'left' ? scrollbarHRef : scrollbarVRef
  let offsetValue = scrollbarRef.value.offsetHeight
  let scrollValue = view.scrollHeight
  let barValue = state.scrollbar.height
  if (direction === 'left') {
    offsetValue = scrollbarRef.value.offsetWidth
    scrollValue = view.scrollWidth
    barValue = state.scrollbar.width
  }
  view.scrollTo({
    [direction]: scrollValue * (mobile / offsetValue) - barValue
  })
}
const getScrollbarThumbVStyle = computed((): StyleValue => {
  const { scrollbar, totalHeight, scrollTop, height } = state
  return {
    transform: `translateY(${height * (scrollTop / totalHeight)}px)`,
    height: `${scrollbar.height}px`
  }
})
const getScrollbarThumbHStyle = computed((): StyleValue => {
  const { scrollbar, totalWidth, scrollLeft, width } = state
  return {
    transform: `translateX(${width * (scrollLeft / totalWidth)}px)`,
    width: `${scrollbar.width}px`
  }
})
</script>
<style lang="scss" scoped>
@import './scrollbar.scss';
</style>
