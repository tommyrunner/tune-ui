<template>
  <div :class="getGroupClass" :style="getGroupStyle" ref="listViewRef">
    <slot v-if="!isVirtualized" />
    <div v-else class="_virtualized" ref="virtualizedRef" :style="getVirtualizedStyle"></div>
  </div>
</template>
<script lang="ts" setup>
import type { PropsType, EmitsType } from './listView'
import { type GroupContextType, listViewGroupKey } from './constants'
import {
  provide,
  reactive,
  toRefs,
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
  isVirtualized: true,
  height: 420,
  listData: () => []
})
const state = reactive({
  virtualized: {
    height: 0,
    itemNum: 0,
    startIndex: 0,
    firstItemHeight: 0
  }
})
const emit = defineEmits<EmitsType>()
const slot = useSlots()
const virtualizedRef = ref<HTMLDivElement>()
const listViewRef = ref<HTMLDivElement>()
// 测量单个元素的高度并计算总高度
onMounted(async () => {
  listViewRef.value.addEventListener('scroll', handleScroll)
  const firstItem = createVNode(listViewItem, props.listData[0], () => [...slot.default(props.listData[0])])
  await nextTick()
  render(firstItem, virtualizedRef.value)
  const rect = firstItem.el.getBoundingClientRect()
  if (rect) state.virtualized.firstItemHeight = rect.height
  const totalHeight = props.listData.length * state.virtualized.firstItemHeight
  state.virtualized.height = totalHeight

  // 渲染列表项
  renderList()
})
// 清理：移除滚动监听器
onDeactivated(() => {
  listViewRef.value.removeEventListener('scroll', handleScroll)
})
// 根据当前滚动位置动态渲染列表项
const renderList = () => {
  const itemsToRender = calculateItemsToRender()
  const itemHeight = state.virtualized.itemNum * state.virtualized.firstItemHeight - props.height
  state.virtualized.itemNum = 0
  const VNodes = itemsToRender.map((item, index) => {
    state.virtualized.itemNum++
    const firstItemHeight = state.virtualized.firstItemHeight
    const params = {
      ...item,
      ...{
        isVirtualized: true,
        top: index * firstItemHeight - Math.max(0, Math.min(listViewRef.value.scrollTop, itemHeight))
      }
    }
    return createVNode(listViewItem, params, () => [...slot.default(params)])
  })
  render(createVNode(Fragment, null, VNodes), virtualizedRef.value)
}

// 计算当前需要渲染的元素范围
const calculateItemsToRender = () => {
  const scrollTop = listViewRef.value.scrollTop
  const firstItemHeight = state.virtualized.firstItemHeight
  const startIndex = Math.floor(scrollTop / firstItemHeight)
  const endIndex = startIndex + Math.ceil(props.height / firstItemHeight)
  return props.listData.slice(startIndex, endIndex)
}

// 滚动事件处理函数
const handleScroll = () => {
  const itemsToRender = calculateItemsToRender()
  if (itemsToRender.length !== props.listData.length) {
    renderList()
  }
}
const changeEvent = () => {}
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
// 抛出操作api，与子组件交互
provide<GroupContextType>(
  listViewGroupKey,
  reactive({
    ...toRefs(props),
    changeEvent
  })
)
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
