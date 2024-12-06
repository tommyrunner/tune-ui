<template>
  <div class="t-listView" :style="{ height: height + 'px' }">
    <Scrollbar
      :total-height="getInnerHeight"
      @scroll-y="listElement => handleScroll(listElement, 'y')"
      @scroll-x="listElement => handleScroll(listElement, 'x')"
      :list-direction="props.direction"
      ref="scrollbarRef"
    >
      <slot name="head" v-if="!isVirtualized" />
      <!-- 虚拟列表渲染 -->
      <div class="_inner" ref="innerRef" :style="getInnerStyle">
        <slot name="head" v-if="isVirtualized" />
        <slot v-if="!isVirtualized" />
        <template v-else>
          <!-- 
            经测试不能使用render动态渲染，会导致provide/inject失效
            而provide/inject对于我们是比较重要的，所以使用vue默认渲染实现
          -->
          <listViewItem v-for="iv in state.itemViews" :key="iv.index" v-bind="iv.bind">
            <slot :index="iv.index" :row="iv.row" />
          </listViewItem>
        </template>
      </div>
    </Scrollbar>
  </div>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from "./listView";
import type { PropsType as ListViewItemPropsType } from "./listView-item";
import { reactive, computed, onMounted, ref, StyleValue, nextTick, watch, toRefs, provide } from "vue";
import listViewItem from "./listView-item.vue";
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
 * 获取容器真实高度
 */
const getInnerHeight = computed(() => {
  return !props.isVirtualized ? state.inner.height : props.listData.length * props.itemHeight;
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
    // 计算item超出部分
    const beyond = itemHeight * state.inner.itemNum - props.height;
    // 计算每个item需要浮动的top位置
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
  const endIndex = startIndex + Math.ceil(props.height / itemHeight);
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
// 抛出操作api，与子组件交互
provide<GroupContextType>(listViewGroupKey, reactive({ ...toRefs(props) }));
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
