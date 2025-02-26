<template>
  <ul class="t-listView" :style="{ height: fromCssVal(props.height) }" ref="listViewRef">
    <!-- 列表头 -->
    <div class="_head t-hide-scrollbar" :ref="(el: HTMLElement) => handleExtItemRef(el, 0)" v-if="slots.head">
      <t-list-view-item><slot name="head" /></t-list-view-item>
    </div>
    <Scrollbar
      :height="props.height"
      @scroll-y="listElement => handleScroll(listElement, 'y')"
      @scroll-x="listElement => handleScroll(listElement, 'x')"
      ref="scrollbarRef"
    >
      <!-- 列表体渲染 -->
      <div class="_inner" ref="innerRef" :style="getInnerStyle">
        <!-- 空数据展示 -->
        <template v-if="!props.listData.length">
          <div class="_empty" v-if="slots.empty">
            <slot name="empty" />
          </div>
          <div class="_empty" v-else>
            <div>{{ props.emptyText }}</div>
          </div>
        </template>
        <!-- 数据列表 -->
        <template v-else>
          <t-list-view-item
            v-for="iv in getListData"
            :fixed="!props.isVirtualized ? props.itemFixed?.(iv.index, iv.row) : false"
            :key="iv.index"
            :height="iv.height"
            :top="iv.top"
          >
            <slot :index="iv.index" :row="iv.row" />
          </t-list-view-item>
        </template>
      </div>
    </Scrollbar>
    <!-- 列表尾 -->
    <div class="_foot t-hide-scrollbar" :ref="(el: HTMLElement) => handleExtItemRef(el, 1)" v-if="slots.foot">
      <t-list-view-item><slot name="foot" /></t-list-view-item>
    </div>
  </ul>
</template>
<script lang="ts" setup>
/**
 * ListView 列表视图组件
 * 支持虚拟滚动、固定项、头尾插槽等功能的列表组件
 */
import type { EmitsType, PropsType, ListItemType } from "./listView";
import { reactive, computed, onMounted, ref, StyleValue, nextTick, watch, toRefs, provide, useSlots } from "vue";
import Scrollbar from "../scrollbar/index.vue";
import { GroupContextType, listViewGroupKey } from "./constants";
import { TListViewItem } from "./index";
import { fromCssVal } from "@/utils";

defineOptions({ name: "TListView" });

const props = withDefaults(defineProps<PropsType>(), {
  isVirtualized: false,
  listData: () => [],
  emptyText: "暂无数据"
});

const emit = defineEmits<EmitsType>();

/** 组件外部插槽引用列表，用于同步头尾部分的滚动 */
const extItemRefList = ref<HTMLElement[]>([]);

/**
 * 获取外部插槽引用的处理函数
 * @param el 插槽DOM元素
 * @param index 插槽索引（0:头部, 1:尾部）
 */
const handleExtItemRef = (el: HTMLElement, index: number) => {
  if (el) {
    extItemRefList.value[index] = el;
  }
};

const slots = useSlots();

/**
 * 列表状态管理对象
 * @property itemViews - 当前渲染的列表项数组
 * @property scrollTop - 垂直滚动位置
 * @property scrollLeft - 水平滚动位置
 * @property inner - 内部容器相关状态
 */
const state = reactive({
  itemViews: [] as ListItemType[],
  scrollTop: 0,
  scrollLeft: 0,
  inner: {
    /** 容器实际高度 */
    height: 0,
    /** 当前渲染的项目数量 */
    itemNum: 0,
    /** 起始渲染索引 */
    startIndex: 0
  },
  fixedRows: null
});

/** 虚拟列表内容容器引用 */
const innerRef = ref<HTMLDivElement>();
/** 列表根容器引用 */
const listViewRef = ref<HTMLDivElement>();
/** 滚动条组件引用 */
const scrollbarRef = ref<InstanceType<typeof Scrollbar>>();

/**
 * 监听数据源变化，触发列表重新渲染
 */
watch(
  () => props.listData,
  () => {
    renderList();
  }
);

onMounted(() => {
  // 非虚拟列表渲染初始化事件抛出
  emit("update-view", scrollbarRef.value.contentRef);
  renderList();
});

/**
 * 获取列表可视区域高度
 * 计算方式：总高度减去头尾插槽高度
 */
const getHeight = computed(() => {
  let height = listViewRef.value.offsetHeight;
  if (slots.head && extItemRefList.value[0]) {
    height -= extItemRefList.value[0].offsetHeight;
  }
  if (slots.foot && extItemRefList.value[1]) {
    height -= extItemRefList.value[1].offsetHeight;
  }
  return height < 0 ? 0 : height;
});

/**
 * 获取列表内容实际高度
 * 虚拟列表：根据项目数量和固定高度计算
 * 普通列表：使用容器实际高度
 */
const getInnerHeight = computed(() => {
  return props.isVirtualized ? (props.listData.length - 1) * props.itemHeight : state.inner.height;
});

/**
 * 获取当前需要渲染的列表数据
 * 虚拟列表：返回计算后的可视区域数据
 * 普通列表：返回完整数据映射
 */
const getListData = computed((): ListItemType[] => {
  return props.isVirtualized ? state.itemViews : props.listData.map((l, index) => ({ row: l, index }));
});

/**
 * 渲染列表内容
 * 仅在虚拟滚动模式下执行
 * 根据当前滚动位置计算需要渲染的项目
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
    state.itemViews.push({ top, height: itemHeight, index, row: rowValue });
  });
  await nextTick();
  emit("update-view", innerRef.value);
};

/**
 * 计算需要渲染的元素范围
 * @returns 当前需要渲染的数据片段
 */
const calculateItemsToRender = () => {
  const itemHeight = props.itemHeight;
  const startIndex = Math.floor(state.scrollTop / itemHeight);
  const endIndex = startIndex + Math.ceil(getHeight.value / itemHeight);
  state.inner.itemNum = endIndex - startIndex;
  return props.listData.slice(startIndex, endIndex);
};

/**
 * 处理列表滚动事件
 * @param content 滚动容器元素
 * @param type 滚动方向：'y'-垂直滚动，'x'-水平滚动
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
 * 计算内容容器样式
 * 处理虚拟滚动模式下的定位和高度
 */
const getInnerStyle = computed(
  (): StyleValue => {
    return {
      height: props.isVirtualized ? `${getInnerHeight.value}px` : "auto",
      position: props.isVirtualized ? `absolute` : "initial"
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

/** 向子组件提供上下文数据 */
provide<GroupContextType>(listViewGroupKey, reactive({ ...toRefs(props) }));

/**
 * 滚动到指定项目
 * @param top 项目top值
 */
const scrollToItem = (top: number, behavior: ScrollBehavior = "smooth") => {
  if (!scrollbarRef.value) return;
  // 使用scrollbar组件的scrollTo方法
  scrollbarRef.value.scrollTo({
    top,
    behavior
  });
};

// 暴露方法给父组件
defineExpose({
  scrollToItem
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
