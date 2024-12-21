<template>
  <ul class="t-listView" :style="{ height: height + 'px' }">
    <!-- 列表头 -->
    <div class="_head t-hide-scrollbar" :ref="(el: HTMLElement) => getExtItemRefList(el, 0)">
      <slot name="head" />
    </div>
    <Scrollbar
      :total-height="getInnerHeight"
      @scroll-y="listElement => handleScroll(listElement, 'y')"
      @scroll-x="listElement => handleScroll(listElement, 'x')"
      :list-direction="props.direction"
      ref="scrollbarRef"
    >
      <!-- 列表体渲染 -->
      <div class="_inner" ref="innerRef" :style="getInnerStyle">
        <slot v-for="iv in getListData" :key="iv.index" :index="iv.index" :row="iv.row" :itemBind="iv.bind" />
      </div>
    </Scrollbar>
    <!-- 列表尾 -->
    <div class="_foot t-hide-scrollbar" :ref="(el: HTMLElement) => getExtItemRefList(el, 1)">
      <slot name="foot" />
    </div>
  </ul>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from "./listView";
import type { PropsType as ListViewItemPropsType } from "./listView-item";
import { reactive, computed, onMounted, ref, StyleValue, nextTick, watch, toRefs, provide, useSlots } from "vue";
import Scrollbar from "../scrollbar/index.vue";
import { GroupContextType, listViewGroupKey } from "./constants";
defineOptions({ name: "TListView" });
const props = withDefaults(defineProps<PropsType>(), {
  direction: "column",
  isVirtualized: false,
  height: 420,
  listData: () => [],
  virtualConfig: () => ({
    fixedIndex: void 0,
    fixedTopValue: 0,
    itemHeight: 0
  })
});
const emit = defineEmits<EmitsType>();
const extItemRefList = ref<HTMLElement[]>([]);
const getExtItemRefList = (el: HTMLElement, index: number) => {
  if (el) {
    extItemRefList.value[index] = el;
  }
};
const slot = useSlots();
const state = reactive({
  itemViews: [],
  // 滚动element值
  scrollTop: 0,
  scrollLeft: 0,
  // 虚拟列表
  inner: {
    // 标记高度
    height: 0,
    // 虚拟列表渲染的元素个数
    itemNum: 0,
    // 虚拟列表渲染的元素起始位置
    startIndex: 0
  },
  // 记录固定item
  fixedRows: null
});
// 虚拟列表容器
const innerRef = ref<HTMLDivElement>();
const scrollbarRef = ref<InstanceType<typeof Scrollbar>>();
watch(
  () => props.listData,
  () => {
    renderList();
  }
);
onMounted(() => {
  // 非虚拟列表渲染初始化事件抛出
  emit("updateView", scrollbarRef.value.listViewRef);
  renderList();
});
/**
 * 获取当前列表总高度(虚拟列表容器需要减去外置行)
 */
const getHeight = computed(() => {
  const { height } = props;
  let value = height;
  if (slot.head && extItemRefList.value[0]) {
    value -= extItemRefList.value[0].offsetHeight;
  }
  if (slot.foot && extItemRefList.value[1]) {
    value -= extItemRefList.value[1].offsetHeight;
  }
  return value < 0 ? 0 : value;
});
/**
 * 获取容器真实高度 (如果是虚拟列表高度需要计算并渲染滚动条,则直接渲染数据高度)
 */
const getInnerHeight = computed(() => {
  return props.isVirtualized ? props.listData.length * props.itemHeight : state.inner.height;
});
/**
 * 获取当前列表数据 (如果是虚拟列表返回计算后数据含有top值,则直接返回数据无需bind绑定数据)
 */
const getListData = computed(() => {
  return props.isVirtualized ? state.itemViews : props.listData.map((l, index) => ({ row: l, index }));
});

/**
 * 根据当前滚动位置动态渲染列表项
 */
const renderList = async () => {
  const { isVirtualized } = props;
  if (!isVirtualized) return;
  const itemsToRender = calculateItemsToRender();
  const { itemHeight } = props;
  state.itemViews.length = 0;
  itemsToRender.map((row, index) => {
    // 计算item总高度超出部分
    const beyond = itemHeight * state.inner.itemNum - getHeight.value;
    // 计算每个item需要浮动的top位置 - 超出部分 - 向上多滚动一个元素
    let top = index * itemHeight - beyond;
    let rowValue = row;
    // 如果有固定的item，需要设置特殊值
    const propsParams: ListViewItemPropsType = {
      top,
      height: itemHeight
    };
    state.itemViews.push({ bind: propsParams, index, row: rowValue });
  });
  await nextTick();
  emit("updateView", innerRef.value);
};

/**
 * 计算当前需要渲染的元素范围
 */
const calculateItemsToRender = () => {
  const itemHeight = props.itemHeight;
  const startIndex = Math.floor(state.scrollTop / itemHeight);
  const endIndex = startIndex + Math.ceil(getHeight.value / itemHeight);
  state.inner.itemNum = endIndex - startIndex;
  return props.listData.slice(startIndex, endIndex);
};

/**
 * 滚动事件处理函数
 * @param content 容器
 * @param type 滚动方向
 */
const handleScroll = (content: HTMLElement, type: "y" | "x") => {
  if (type === "y") {
    state.scrollTop = content.scrollTop;
    // 渲染列表
    renderList();
  } else {
    state.scrollLeft = content.scrollLeft;
    // 同步外置行滚动条
    extItemRefList.value.forEach((item: HTMLElement) => {
      item.scrollLeft = state.scrollLeft;
    });
  }
  // 触发滚动
  emit("scroll", content);
};

/**
 * 滚动高度
 */
const getInnerStyle = computed(
  (): StyleValue => {
    return {
      height: props.isVirtualized ? `${getInnerHeight.value}px` : "auto"
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
// 抛出操作api，与子组件交互
provide<GroupContextType>(listViewGroupKey, reactive({ ...toRefs(props) }));
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
