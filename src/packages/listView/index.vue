<template>
  <div :class="getGroupClass" :style="getGroupStyle">
    <div
      :class="['_scrollbar', '_scrollbar-v', state.scrollbar.isMove && '_scrollbar-notMove']"
      @click="(event: MouseEvent) => handlerScrollbarClick(event, 'top')"
      ref="scrollbarVRef"
    >
      <div
        class="_scrollbar-thumb"
        @click.stop
        @mousedown="state.scrollbar.isMove = true"
        :style="getScrollbarThumbVStyle"
      ></div>
    </div>
    <div
      :class="['_scrollbar', '_scrollbar-h', state.scrollbar.isMove && '_scrollbar-notMove']"
      @click="(event: MouseEvent) => handlerScrollbarClick(event, 'left')"
      ref="scrollbarHRef"
    >
      <div
        class="_scrollbar-thumb"
        @click.stop
        @mousedown="state.scrollbar.isMove = true"
        :style="getScrollbarThumbHStyle"
      ></div>
    </div>
    <div class="_content" :style="getContentStyle" ref="listViewRef" @scroll="handleScroll">
      <slot v-if="!isVirtualized" />
      <div v-else class="_virtualized" ref="virtualizedRef" :style="getVirtualizedStyle"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropsType, DirectionType } from './listView'
import {
  reactive,
  computed,
  onMounted,
  ref,
  createVNode,
  render,
  StyleValue,
  Fragment,
  onDeactivated,
  useSlots,
  nextTick
} from 'vue'
import listViewItem from './listView-item.vue'
defineOptions({ name: 'TListView' })
const props = withDefaults(defineProps<PropsType>(), {
  isVirtualized: false,
  height: 420,
  listData: () => []
})
const state = reactive({
  // 当前滚动位置
  scrollTop: 0,
  // 总高度
  totalHeight: 0,
  // listView当前处于位置
  point: {
    x: 0,
    y: 0
  },
  // 滚动条
  scrollbar: {
    // 拖动方向
    direction: 'top' as DirectionType,
    // 滚动条高度
    height: 0,
    // 当前是否处于拖动
    isMove: false
  },
  // 虚拟列表
  virtualized: {
    // 虚拟列表高度
    height: 0,
    // 虚拟列表渲染的元素个数
    itemNum: 0,
    // 虚拟列表渲染的元素起始位置
    startIndex: 0,
    // 虚拟列表的元素高度
    firstItemHeight: 0
  }
})
const slot = useSlots()
const virtualizedRef = ref<HTMLDivElement>()
const listViewRef = ref<HTMLDivElement>()
const scrollbarVRef = ref<HTMLDivElement>()
const scrollbarHRef = ref<HTMLDivElement>()
// 测量单个元素的高度并计算总高度
onMounted(async () => {
  window.addEventListener('mousemove', handlerScrollbarMover)
  window.addEventListener('mouseup', handlerCloseMove)
  window.addEventListener('mouseleave', handlerCloseMove)
  // 虚拟列表中测量单个元素的高度
  if (props.isVirtualized) {
    const firstItem = createVNode(listViewItem, props.listData[0], () => [...slot.default(props.listData[0])])
    await nextTick()
    render(firstItem, virtualizedRef.value)
    const itemRect = firstItem.el.getBoundingClientRect()
    if (itemRect) state.virtualized.firstItemHeight = itemRect.height
    state.virtualized.height = props.listData.length * state.virtualized.firstItemHeight
    // 渲染列表项
    renderList()
  }
  state.totalHeight = props.isVirtualized ? state.virtualized.height : listViewRef.value.scrollHeight
  state.scrollbar.height = props.height * (props.height / state.totalHeight) - 4
  const listRect = listViewRef.value.getBoundingClientRect()
  state.point = {
    x: listRect.left,
    y: listRect.top
  }
})
// 清理：移除滚动监听器
onDeactivated(() => {
  window.removeEventListener('mousemove', handlerScrollbarMover)
  window.removeEventListener('mouseup', handlerCloseMove)
  window.removeEventListener('mouseleave', handlerCloseMove)
})
// 根据当前滚动位置动态渲染列表项
const renderList = () => {
  state.scrollTop = listViewRef.value.scrollTop
  if (!props.isVirtualized) return
  const itemsToRender = calculateItemsToRender()
  // 渲染的item总个数高度
  const itemHeight = state.virtualized.itemNum * state.virtualized.firstItemHeight - props.height
  state.virtualized.itemNum = 0
  const firstItemHeight = state.virtualized.firstItemHeight
  const VNodes = itemsToRender.map((item, index) => {
    state.virtualized.itemNum++
    // props 参数
    const propsParams = {
      isVirtualized: true,
      top: index * firstItemHeight - Math.max(0, Math.min(state.scrollTop, itemHeight))
    }
    return createVNode(listViewItem, propsParams, () => [...slot.default(item)])
  })
  render(createVNode(Fragment, null, VNodes), virtualizedRef.value)
}

// 计算当前需要渲染的元素范围
const calculateItemsToRender = () => {
  const scrollTop = (state.scrollTop = listViewRef.value.scrollTop)
  const firstItemHeight = state.virtualized.firstItemHeight
  const startIndex = Math.floor(scrollTop / firstItemHeight)
  const endIndex = startIndex + Math.ceil(props.height / firstItemHeight)
  return props.listData.slice(startIndex, endIndex)
}

// 滚动事件处理函数
const handleScroll = () => {
  renderList()
}
const handlerScrollbarClick = (event: MouseEvent, direction: DirectionType) => {
  state.scrollbar.direction = direction
  const x = direction === 'left' ? event.layerX : event.layerY
  updateScrollbar(x, direction)
}
const handlerScrollbarMover = (event: MouseEvent) => {
  if (state.scrollbar.isMove && listViewRef.value) {
    updateScrollbar(event.pageY - state.point.y - 4, state.scrollbar.direction)
  }
}
const handlerCloseMove = () => {
  state.scrollbar.isMove = false
}
const updateScrollbar = (mobile: number, direction: DirectionType) => {
  if (listViewRef.value) {
    const scrollbarRef = direction === 'left' ? scrollbarHRef : scrollbarVRef
    listViewRef.value.scrollTo({
      [direction]: listViewRef.value.scrollHeight * (mobile / scrollbarRef.value.offsetHeight) - state.scrollbar.height
    })
  }
}
const getGroupClass = computed(() => {
  return ['t-listView']
})
const getGroupStyle = computed((): StyleValue => {
  const { height } = props
  return {
    height: `${height}px`
  }
})
const getVirtualizedStyle = computed((): StyleValue => {
  const { height } = state.virtualized
  return {
    height: `${height}px`
  }
})
const getScrollbarThumbVStyle = computed((): StyleValue => {
  const { scrollbar, totalHeight, scrollTop } = state
  return {
    transform: `translateY(${props.height * (scrollTop / totalHeight)}px)`,
    height: `${scrollbar.height}px`
  }
})
const getScrollbarThumbHStyle = computed((): StyleValue => {
  const { scrollbar, totalHeight, scrollTop } = state
  return {
    transform: `translateX(${props.height * (scrollTop / totalHeight)}px)`,
    width: `${scrollbar.height}px`
  }
})
const getContentStyle = computed((): StyleValue => {
  return {
    userSelect: state.scrollbar.isMove ? 'none' : 'auto'
  }
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
