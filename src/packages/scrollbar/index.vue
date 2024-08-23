<template>
  <!-- TODO: 通过距离计算 -->
  <div
    :class="[...getScrollbarClass, '_scrollbar-v']"
    @mousedown="(event: MouseEvent) => handlerScrollbarClick(event, 'top')"
    ref="scrollbarVRef"
  >
    <div class="_scrollbar-thumb" @mousedown="handlerOpenMove" :style="getScrollbarThumbVStyle"></div>
  </div>
  <div
    :class="[...getScrollbarClass, '_scrollbar-h']"
    @mousedown="(event: MouseEvent) => handlerScrollbarClick(event, 'left')"
    ref="scrollbarHRef"
  >
    <div class="_scrollbar-thumb" @mousedown="handlerOpenMove" :style="getScrollbarThumbHStyle"></div>
  </div>
</template>
<script lang="ts" setup>
import type { PropsType, DirectionType } from './scrollbar'
import { computed, nextTick, onDeactivated, reactive, ref, StyleValue, watch } from 'vue'

const scrollbarVRef = ref<HTMLDivElement>()
const scrollbarHRef = ref<HTMLDivElement>()
const props = withDefaults(defineProps<PropsType>(), {})
// 默认间距
const gap = 4
const state = reactive({
  // 记录view宽高
  viewHeight: 0,
  viewWidth: 0,
  // 当前滚动位置
  scrollTop: 0,
  scrollLeft: 0,
  // 总高度
  totalHeight: 0,
  totalWidth: 0,
  // listView当前处于位置
  pageViewPoint: {
    x: 0,
    y: 0
  },
  // 滚动条
  scrollbar: {
    // 拖动方向
    direction: 'top' as DirectionType,
    // 滚动条高度
    height: 0,
    width: 0,
    // 记录点击滑块位置
    clickPoint: {
      x: 0,
      y: 0
    },
    // 当前是否处于拖动
    isMove: false,
    // 是否显示
    isShowH: false,
    isShowV: false
  }
})
/**
 * 因为总高度会改变
 */
watch(
  () => props.totalHeight,
  () => {
    updatePoint()
  }
)
nextTick(() => {
  handlerEventListener()
  updatePoint()
})
// 清理：移除滚动监听器
onDeactivated(() => handlerEventListener(true))
/**
 * 统一处理事件
 * @param remove 是否移出
 */
const handlerEventListener = (remove = false) => {
  const method = remove ? 'removeEventListener' : 'addEventListener'
  window[method]('mousemove', handlerScrollbarMove)
  window[method]('mouseup', handlerCloseMove)
  window[method]('mouseleave', handlerCloseMove)
  window[method]('resize', updatePoint)
  if (props.element) {
    props.element[method]('scroll', handlerViewScrollbar)
    props.element.parentElement[method]('mouseenter', handlerViewEnter)
    props.element.parentElement[method]('mouseleave', handlerViewLeave)
  }
}
/**
 * 更新滚动条位置以及宽高
 */
const updatePoint = () => {
  const element = props.element
  if (!element) return
  state.viewHeight = element.offsetHeight
  state.viewWidth = element.offsetWidth
  state.totalHeight = element.scrollHeight
  state.totalWidth = element.scrollWidth
  // 指定高度
  if (props.totalHeight) state.totalHeight = props.totalHeight
  // 计算滚动条高度（总高度 * (比例) - 间距）
  state.scrollbar.height = state.viewHeight * (state.viewHeight / state.totalHeight) - gap
  state.scrollbar.width = element.clientWidth * (element.clientWidth / element.scrollWidth) - gap
}

/**
 * 处理点击快捷跳转
 * @param event 事件
 * @param direction 方向
 */
const handlerScrollbarClick = (event: MouseEvent, direction: DirectionType) => {
  //   计算当前位置
  const rect = props.element.getBoundingClientRect()
  // 每次点击的时候获取view当前屏幕位置(*用于计算全屏拉动)
  state.pageViewPoint = {
    x: rect.left,
    y: rect.top
  }
  state.scrollbar.direction = direction
  const mobile = direction === 'left' ? event.layerX : event.layerY
  // 点击滑块无需快捷跳转
  if (event.target === scrollbarVRef.value.firstChild || event.target === scrollbarHRef.value.firstChild) return
  updateScrollbar(mobile - state.scrollbar.height / 2, direction)
}
/**
 * 处理拖动事件(这里是全屏拖动，尽量模拟window)
 * @param event
 */
const handlerScrollbarMove = (event: MouseEvent) => {
  if (state.scrollbar.isMove) {
    const { scrollbar, pageViewPoint } = state
    // 计算(界面点击位置 - 当前拖块本身点击位置)
    const pageVal =
      scrollbar.direction === 'left' ? event.clientX - scrollbar.clickPoint.x : event.clientY - scrollbar.clickPoint.y
    const pointVal = scrollbar.direction === 'left' ? pageViewPoint.x : pageViewPoint.y
    updateScrollbar(pageVal - pointVal - gap, state.scrollbar.direction)
  }
  return false
}
/**
 * 处理状态
 */
const handlerCloseMove = () => {
  state.scrollbar.isMove = false
}
const handlerOpenMove = (event: MouseEvent) => {
  // 记录拖块本身点击位置(作为拖块位置的条件)
  state.scrollbar.clickPoint = {
    x: event.offsetX,
    y: event.offsetY
  }
  state.scrollbar.isMove = true
}
const handlerViewEnter = () => {
  // 通过滚动宽高与实际宽高判断是否显示滚动条
  state.scrollbar.isShowH = props.element.scrollWidth > props.element.offsetWidth
  state.scrollbar.isShowV = props.element.scrollHeight > props.element.offsetHeight
}
const handlerViewLeave = () => {
  state.scrollbar.isShowV = state.scrollbar.isShowH = false
}
/**
 * 动态view滚动值
 */
const handlerViewScrollbar = () => {
  state.scrollTop = props.element.scrollTop
  state.scrollLeft = props.element.scrollLeft
}
/**
 * 通过计算得到的拖动值,更新view滚动值
 */
const updateScrollbar = (mobile: number, direction: DirectionType) => {
  const element = props.element
  const scrollbarRef = direction === 'left' ? scrollbarHRef : scrollbarVRef
  let offsetValue = scrollbarRef.value.offsetHeight
  let scrollValue = element.scrollHeight
  if (direction === 'left') {
    offsetValue = scrollbarRef.value.offsetWidth
    scrollValue = element.scrollWidth
  }
  // 更新滚动值(滚动值 * (比例))
  element.scrollTo({
    [direction]: scrollValue * (mobile / offsetValue)
  })
}
/**
 * 处理class 以及 style 动态样式
 */
const getScrollbarClass = computed(() => [
  '_scrollbar',
  state.scrollbar.isMove && '_scrollbar-notMove',
  state.scrollbar.isShowH && '_scrollbar-hover-h',
  state.scrollbar.isShowV && '_scrollbar-hover-v'
])
const getScrollbarThumbVStyle = computed((): StyleValue => {
  const { scrollbar, totalHeight, scrollTop, viewHeight } = state
  return {
    transform: `translateY(${viewHeight * (scrollTop / totalHeight)}px)`,
    height: `${scrollbar.height}px`
  }
})
const getScrollbarThumbHStyle = computed((): StyleValue => {
  const { scrollbar, totalWidth, scrollLeft, viewWidth } = state
  return {
    transform: `translateX(${viewWidth * (scrollLeft / totalWidth)}px)`,
    width: `${scrollbar.width}px`
  }
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
