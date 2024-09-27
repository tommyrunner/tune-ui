<template>
  <div :class="getGroupClass" :style="getGroupStyle">
    <Scrollbar :total-height="getInnerHeight" @scroll-y="handleScroll" :list-direction="props.direction" ref="scrollbarRef">
      <slot v-if="!isVirtualized" />
      <div v-else class="_inner" ref="innerRef" :style="getInnerStyle"></div>
    </Scrollbar>
  </div>
</template>
<script lang="ts" setup>
import type { ListSlotParamsType, PropsType } from "./listView";
import { reactive, computed, onMounted, ref, createVNode, render, StyleValue, Fragment, useSlots, nextTick, watch } from "vue";
import listViewItem from "./listView-item.vue";
import Scrollbar from "../scrollbar/index.vue";
defineOptions({ name: "TListView" });
const props = withDefaults(defineProps<PropsType>(), {
  direction: "column",
  isVirtualized: false,
  height: 420,
  listData: () => []
});
const state = reactive({
  // 滚动element值
  scrollTop: 0,
  // 虚拟列表
  inner: {
    // 标记高度
    height: 0,
    // 虚拟列表渲染的元素个数
    itemNum: 0,
    // 虚拟列表渲染的元素起始位置
    startIndex: 0,
    // 虚拟列表的元素高度
    firstItemHeight: 0
  }
});
const slot = useSlots();
const innerRef = ref<HTMLDivElement>();
const scrollbarRef = ref<InstanceType<typeof Scrollbar>>();
watch(
  () => props.listData,
  () => {
    renderList();
  }
);
// 测量单个元素的高度并计算总高度
onMounted(async () => {
  // 虚拟列表中测量单个元素的高度
  if (props.isVirtualized) {
    const firstItem = createVNode(listViewItem, props.listData[0], () => [
      ...slot.default({ row: props.listData[0], index: 0 } as ListSlotParamsType)
    ]);
    await nextTick();
    render(firstItem, innerRef.value);
    const itemRect = firstItem.el.getBoundingClientRect();
    if (itemRect) state.inner.firstItemHeight = itemRect.height;
    // 渲染列表项
    renderList();
  }
});
const getInnerHeight = computed(() => {
  return state.inner.height || props.listData.length * state.inner.firstItemHeight;
});

// 根据当前滚动位置动态渲染列表项
const renderList = () => {
  if (!props.isVirtualized) return;
  const itemsToRender = calculateItemsToRender();
  // 渲染的item总个数高度
  const itemHeight = state.inner.itemNum * state.inner.firstItemHeight - props.height;
  state.inner.itemNum = 0;
  const firstItemHeight = state.inner.firstItemHeight;
  const VNodes = itemsToRender.map((row, index) => {
    state.inner.itemNum++;
    // props 参数
    const propsParams = {
      isVirtualized: props.isVirtualized,
      top: index * firstItemHeight - Math.max(0, Math.min(state.scrollTop, itemHeight))
    };
    return createVNode(listViewItem, propsParams, () => [...slot.default({ row, index } as ListSlotParamsType)]);
  });
  render(createVNode(Fragment, null, VNodes), innerRef.value);
};

// 计算当前需要渲染的元素范围
const calculateItemsToRender = () => {
  const firstItemHeight = state.inner.firstItemHeight;
  const startIndex = Math.floor(state.scrollTop / firstItemHeight);
  const endIndex = startIndex + Math.ceil(props.height / firstItemHeight);
  return props.listData.slice(startIndex, endIndex);
};

// 滚动事件处理函数
const handleScroll = (listElement: HTMLElement) => {
  state.scrollTop = listElement.scrollTop;
  renderList();
};

const getGroupClass = computed(() => {
  return ["t-listView"];
});
const getGroupStyle = computed((): StyleValue => {
  const { height } = props;
  return {
    height: `${height}px`
  };
});
const getInnerStyle = computed(
  (): StyleValue => {
    return {
      height: `${getInnerHeight.value}px`
    };
  },
  {
    async onTrack() {
      await nextTick();
      const offsetHeight = innerRef.value?.offsetHeight;
      // 当浏览器重置高度时,重新设置高度
      if (getInnerHeight.value > offsetHeight) {
        state.inner.height = innerRef.value.offsetHeight;
      }
    }
  }
);
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
