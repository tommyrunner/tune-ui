<template>
  <div :class="getGroupClass" :style="getGroupStyle">
    <Scrollbar :total-height="state.virtualized.height" @scroll-y="handleScroll">
      <slot v-if="!isVirtualized" />
      <div v-else class="_virtualized" ref="virtualizedRef" :style="getVirtualizedStyle"></div>
    </Scrollbar>
  </div>
</template>
<script lang="ts" setup>
import type { PropsType } from './listView'
import {
  reactive,
  computed,
  onMounted,
  ref,
  createVNode,
  render,
  StyleValue,
  Fragment,
  useSlots,
  nextTick,
  watch
} from 'vue'
import listViewItem from './listView-item.vue'
import Scrollbar from '../scrollbar/index.vue'
defineOptions({ name: 'TListView' })
const props = withDefaults(defineProps<PropsType>(), {
  isVirtualized: false,
  height: 420,
  listData: () => []
})
const state = reactive({
  // 滚动element值
  scrollTop: 0,
  // 虚拟列表
  virtualized: {
    // 虚拟列表高度
    height: 0,
    width: 0,
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
watch(
  () => props.listData,
  () => {
    renderList()
  }
)
// 测量单个元素的高度并计算总高度
onMounted(async () => {
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
})

// 根据当前滚动位置动态渲染列表项
const renderList = () => {
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
  const firstItemHeight = state.virtualized.firstItemHeight
  const startIndex = Math.floor(state.scrollTop / firstItemHeight)
  const endIndex = startIndex + Math.ceil(props.height / firstItemHeight)
  return props.listData.slice(startIndex, endIndex)
}

// 滚动事件处理函数
const handleScroll = (listElement: HTMLElement) => {
  state.scrollTop = listElement.scrollTop
  renderList()
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
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
