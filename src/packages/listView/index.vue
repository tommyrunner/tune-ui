<template>
  <div :class="getGroupClass" :style="getGroupStyle">
    <Scrollbar :total-height="getInnerHeight" @scroll-y="handleScroll" :list-direction="props.direction" ref="scrollbarRef">
      <slot v-if="!isVirtualized" />
      <div v-else class="_inner" ref="innerRef" :style="getInnerStyle">
        <!-- 
          经测试不能使用render动态渲染，会导致provide/inject失效
          而provide/inject对于我们是比较重要的，所以使用vue默认渲染实现
        -->
        <listViewItem v-for="iv in state.itemEls" :key="iv.index" v-bind="iv.params">
          <slot :index="iv.index" :row="iv.row" />
        </listViewItem>
      </div>
    </Scrollbar>
  </div>
</template>
<script lang="ts" setup>
import type { PropsType } from "./listView";
import type { PropsType as ListViewItemPropsType } from "./listView-item";
import { reactive, computed, onMounted, ref, StyleValue, nextTick, watch } from "vue";
import listViewItem from "./listView-item.vue";
import Scrollbar from "../scrollbar/index.vue";
defineOptions({ name: "TListView" });
const props = withDefaults(defineProps<PropsType>(), {
  direction: "column",
  isVirtualized: false,
  height: 420,
  listData: () => [],
  virtualConfig: () => ({
    fixedIndex: void 0,
    fixedTopValue: 0
  })
});

const state = reactive({
  itemEls: [],
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
    firstItemHeight: 57
  },
  // 记录固定item
  fixedRows: null
});
// const slot = useSlots();
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
  // if (props.isVirtualized) {
  //   const firstItem = createVNode(listViewItem, props.listData[0], () => [
  //     ...slot.default({ row: props.listData[0], index: 0 } as ListSlotParamsType)
  //   ]);
  // await nextTick();
  //   render(firstItem, innerRef.value);
  //   const itemRect = firstItem.el.getBoundingClientRect();
  //   console.log(itemRect);
  //   console.dir(firstItem);
  //   // if (itemRect) state.inner.firstItemHeight = itemRect.height;
  //   firstItem.el.remove();
  //   // 渲染列表项
  renderList();
  // }
});
const getInnerHeight = computed(() => {
  return state.inner.height || props.listData.length * state.inner.firstItemHeight;
});

// 根据当前滚动位置动态渲染列表项
const renderList = () => {
  const { isVirtualized, virtualConfig } = props;
  if (!isVirtualized) return;
  const itemsToRender = calculateItemsToRender();
  // 渲染的item总个数高度
  // const itemHeight = state.inner.itemNum * state.inner.firstItemHeight - height;
  // state.inner.itemNum = 0;
  const firstItemHeight = state.inner.firstItemHeight;
  state.itemEls.length = 0;
  itemsToRender.map((row, index) => {
    // state.inner.itemNum++;
    // 记录需要固定的值
    if (!state.fixedRows && virtualConfig?.fixedIndex === index) state.fixedRows = row;
    // item 的 props 参数
    let zIndex = 0;
    // 计算item超出部分
    const beyond = firstItemHeight * state.inner.itemNum - props.height;
    // 计算每个item需要浮动的top位置
    let top = index * firstItemHeight - beyond;
    let rowValue = row;
    // 如果有固定的item，需要设置特殊值
    if (index === virtualConfig?.fixedIndex && state.fixedRows) {
      zIndex = 1;
      top = virtualConfig?.fixedTopValue;
      rowValue = state.fixedRows;
    }
    const propsParams: ListViewItemPropsType = {
      isVirtualized: isVirtualized,
      zIndex: zIndex,
      top: top,
      height: state.inner.firstItemHeight
    };
    state.itemEls.push({ params: propsParams, index, row: rowValue });
  });
};

// 计算当前需要渲染的元素范围
const calculateItemsToRender = () => {
  const firstItemHeight = state.inner.firstItemHeight;
  const startIndex = Math.floor(state.scrollTop / firstItemHeight);
  const endIndex = startIndex + Math.ceil(props.height / firstItemHeight);
  state.inner.itemNum = endIndex - startIndex;
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
