<template>
  <div class="t-scrollbar">
    <div :class="[...getScrollbarClass, '_scrollbar-v']" @mousedown="handlerScrollbarClick" ref="thumbVRef">
      <div
        class="_scrollbar-thumb"
        @mousedown="(event: MouseEvent) => handlerOpenMove(event, 'top')"
        :style="getScrollbarThumbVStyle"
      ></div>
    </div>
    <div :class="[...getScrollbarClass, '_scrollbar-h']" @mousedown="handlerScrollbarClick" ref="thumbHRef">
      <div
        class="_scrollbar-thumb"
        @mousedown="(event: MouseEvent) => handlerOpenMove(event, 'left')"
        :style="getScrollbarThumbHStyle"
      ></div>
    </div>
    <div class="_content" ref="scrollbarRef" :style="getContentStyle">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropsType, DirectionType, EmitsType } from './scrollbar'
import { computed, nextTick, onDeactivated, reactive, ref, StyleValue, watch } from 'vue'

defineOptions({ name: 'TScrollbar' })
const emit = defineEmits<EmitsType>()
const scrollbarRef = ref<HTMLDivElement>()
const thumbVRef = ref<HTMLDivElement>()
const thumbHRef = ref<HTMLDivElement>()
const props = withDefaults(defineProps<PropsType>(), {
  listDirection: 'column'
})
// 最小thumb尺寸 比例
const THUMB_MIN_SIZE = 0.046
let elementObserver: null | MutationObserver = null
const state = reactive({
  // 记录element宽高
  elementHeight: 0,
  elementWidth: 0,
  // 当前滚动位置
  scrollTop: 0,
  scrollLeft: 0,
  // 总高度
  totalHeight: 0,
  totalWidth: 0,
  // listElement当前处于位置
  pageElementPoint: {
    x: 0,
    y: 0
  },
  // 滚动条
  scrollbar: {
    // 拖动方向
    direction: 'none' as DirectionType,
    // 滚动条高度
    height: 0,
    width: 0,
    // 记录点击滑块位置
    clickPoint: {
      x: 0,
      y: 0
    },
    // 当前是否处于拖动
    isMoveH: false,
    isMoveV: false,
    // 是否显示
    isShowH: false,
    isShowV: false
  }
})
/**
 * 总高度可指定
 */
watch(
  () => props.totalHeight,
  () => {
    updateScrollbar()
  }
)
nextTick(() => {
  // 监听节点变化
  elementObserver = new MutationObserver(updateScrollbar)
  // 初始化事件
  handlerEventListener()
  // 计算位置与大小
  updateScrollbar()
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
  window[method]('resize', updateScrollbar)
  const element = scrollbarRef.value
  if (element) {
    element[method]('scroll', handlerElementScrollbar)
    element.parentElement[method]('mouseenter', handlerElementEnter)
    element.parentElement[method]('mouseleave', handlerElementLeave)
    // 节点发生变化，更新拖块大小
    elementObserver.observe(element, { childList: true, attributes: true, attributeFilter: ['style'], subtree: true })
  }
  if (remove) {
    elementObserver.disconnect()
  }
}
/**
 * 更新滚动条位置以及宽高
 */
const updateScrollbar = () => {
  const element = scrollbarRef.value
  if (!element) return
  const { offsetHeight, offsetWidth, scrollHeight, scrollWidth, clientWidth } = element
  state.elementHeight = offsetHeight
  state.elementWidth = offsetWidth
  state.totalHeight = scrollHeight
  state.totalWidth = scrollWidth
  // 指定高度
  if (props.totalHeight) state.totalHeight = props.totalHeight
  // 计算滚动条高度（总高度 * (比例) - 间距）:取最小尺寸(高度*比例)
  state.scrollbar.height = Math.max(
    state.elementHeight * (state.elementHeight / state.totalHeight),
    state.elementHeight * THUMB_MIN_SIZE
  )
  state.scrollbar.width = Math.max(clientWidth * (clientWidth / scrollWidth), clientWidth * THUMB_MIN_SIZE)
}

/**
 * 处理点击快捷跳转
 * @param event 事件
 * @param direction 方向
 */
const handlerScrollbarClick = (event: MouseEvent) => {
  //   计算当前位置
  const rect = scrollbarRef.value.getBoundingClientRect()
  // 每次点击的时候获取element当前屏幕位置(*用于计算全屏拉动)
  state.pageElementPoint = {
    x: rect.left,
    y: rect.top
  }
  const mobile = state.scrollbar.direction === 'left' ? event.layerX : event.layerY
  // 点击滑块无需快捷跳转
  if (event.target === thumbVRef.value.firstChild || event.target === thumbHRef.value.firstChild) return
  setScrollbar(mobile - state.scrollbar.height / 2, state.scrollbar.direction)
}
/**
 * 处理拖动事件(这里是全屏拖动，尽量模拟window)
 * @param event
 */
const handlerScrollbarMove = (event: MouseEvent) => {
  const { isMoveH, isMoveV } = state.scrollbar
  if (isMoveH || isMoveV) {
    const { scrollbar, pageElementPoint } = state
    // 计算(界面点击位置 - 当前拖块本身点击位置)
    const pageVal =
      scrollbar.direction === 'left' ? event.clientX - scrollbar.clickPoint.x : event.clientY - scrollbar.clickPoint.y
    const pointVal = scrollbar.direction === 'left' ? pageElementPoint.x : pageElementPoint.y
    setScrollbar(pageVal - pointVal, state.scrollbar.direction)
  }
  return false
}
/**
 * 处理状态
 */
const handlerCloseMove = () => {
  state.scrollbar.isMoveH = false
  state.scrollbar.isMoveV = false
}
const handlerOpenMove = (event: MouseEvent, direction: DirectionType) => {
  // 更新当前触发滚动条方向
  state.scrollbar.direction = direction
  // 拖动时不能选中文本
  event.preventDefault()
  // 记录拖块本身点击位置(作为拖块位置的条件)
  state.scrollbar.clickPoint = {
    x: event.offsetX,
    y: event.offsetY
  }
  if (direction === 'left') state.scrollbar.isMoveH = true
  if (direction === 'top') state.scrollbar.isMoveV = true
}
const handlerElementEnter = () => {
  const { offsetHeight, offsetWidth, scrollHeight, scrollWidth } = scrollbarRef.value
  // 通过滚动宽高与实际宽高判断是否显示滚动条
  state.scrollbar.isShowH = scrollWidth > offsetWidth
  state.scrollbar.isShowV = scrollHeight > offsetHeight
}
const handlerElementLeave = () => {
  state.scrollbar.isShowV = state.scrollbar.isShowH = false
}
/**
 * 动态element滚动值
 */
const handlerElementScrollbar = () => {
  const element = scrollbarRef.value
  state.scrollTop = element.scrollTop
  state.scrollLeft = element.scrollLeft
  if (state.scrollbar.direction === 'left') emit('scrollX', element)
  else emit('scrollY', element)
}
/**
 * 通过计算得到的拖动值,更新element滚动值
 */
const setScrollbar = (mobile: number, direction: DirectionType) => {
  const element = scrollbarRef.value
  const thumbRef = direction === 'left' ? thumbHRef : thumbVRef
  let offsetValue = scrollbarRef.value.offsetHeight
  let scrollValue = element.scrollHeight
  if (direction === 'left') {
    offsetValue = thumbRef.value.offsetWidth
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
const getScrollbarClass = computed(() => {
  const { isMoveH, isMoveV, isShowH, isShowV } = state.scrollbar
  return [
    '_scrollbar',
    !props.permanent && '_scrollbar-permanent',
    (isShowH || isMoveH) && '_scrollbar-hover-h',
    (isShowV || isMoveV) && '_scrollbar-hover-v'
  ]
})
const getScrollbarThumbVStyle = computed((): StyleValue => {
  const { scrollbar, totalHeight, scrollTop, elementHeight } = state
  // 得出位置率: 滚动位置/(滚动高度 - 组件高度)
  const ratio = scrollTop / (totalHeight - elementHeight)
  // 得出真实高度(组件高度 - 拖块高度 - 间距)
  const height = elementHeight - scrollbar.height - 4

  return {
    transform: `translateY(${ratio * height}px)`,
    height: `${scrollbar.height}px`
  }
})
const getScrollbarThumbHStyle = computed((): StyleValue => {
  const { scrollbar, totalWidth, scrollLeft, elementWidth } = state
  const ratio = scrollLeft / (totalWidth - elementWidth)
  const width = elementWidth - scrollbar.width - 4
  return {
    transform: `translateX(${ratio * width}px)`,
    width: `${scrollbar.width}px`
  }
})
const getContentStyle = computed((): StyleValue => {
  return {
    flexDirection: props.listDirection
  }
})
defineExpose({
  updateScrollbar,
  setScrollbar
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
