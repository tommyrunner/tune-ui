<template>
  <div :class="getGroupClass" :style="getGroupStyle">
    <slot v-if="!isVirtualized" />
    <div v-else class="_virtualized" ref="virtualizedRef"></div>
  </div>
</template>
<script lang="ts" setup>
import type { PropsType, EmitsType } from './listView'
import { type GroupContextType, listViewGroupKey } from './constants'
import { provide, reactive, toRefs, computed, onMounted, ref, createVNode, render, StyleValue } from 'vue'
import listViewItem from './listView-item.vue'
defineOptions({ name: 'TListView' })
const props = withDefaults(defineProps<PropsType>(), {
  isVirtualized: true,
  height: '420px',
  listData: () => []
})
const state = reactive({
  virtualized: {
    height: 0
  }
})
const emit = defineEmits<EmitsType>()
const virtualizedRef = ref<HTMLDivElement>()
onMounted(() => {
  // 计算高度
  if (virtualizedRef.value) {
    props.listData.forEach((l) => {
      const VNode = createVNode(listViewItem, {})
      render(VNode, virtualizedRef.value)
    })
  }
})
const changeEvent = () => {}
const getGroupClass = computed(() => {
  return ['t-listView']
})
const getGroupStyle = computed((): StyleValue => {
  const { height } = props
  return {
    height
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
