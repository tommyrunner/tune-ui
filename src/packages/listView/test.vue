<template>
  <div class="virtual-list-container">
    <!-- 虚拟滚动条：撑开总高度 -->
    <div class="virtual-list-phantom" :style="{ height: totalHeight + 'px' }"></div>

    <!-- 实际滚动区域 -->
    <dev class="virtual-list" @scroll="handleScroll" ref="listRef">
      <!-- 列表项容器：使用transform进行位置偏移 -->
      <div class="list-items" :style="{ transform: `translateY(${offset}px)` }">
        <div
          v-for="item in visibleData"
          :key="item.index"
          :data-index="item.index"
          :style="{ height: `${((item.index % 2) + 1) * 30}px` }"
          class="list-item"
          :ref="setItemRef"
        >
          {{ item.index + 1 }}
        </div>
      </div>
    </dev>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive, onBeforeUpdate, watch } from "vue";

// 核心配置
const state = reactive({
  listData: Array.from({ length: 10000000 }, (_, i) => ({ id: i })),
  estimatedItemHeight: 50,
  bufferSize: 10,
  viewportHeight: 400,
  scrollTop: 0,
  positions: new Map<number, { top: number; bottom: number; height: number }>(),
  lastMeasuredIndex: -1,
  isUpdating: false
});

// 视图范围状态
const viewRange = reactive({
  startIndex: 0,
  endIndex: 0
});

const listRef = ref<HTMLElement | null>(null);
const itemRefs = ref<HTMLElement[]>([]);

// ref 设置函数
const setItemRef = (el: HTMLElement | null) => {
  if (el) {
    const index = parseInt(el.getAttribute("data-index") || "0");
    itemRefs.value[index] = el;
  }
};

// 清理 refs
onBeforeUpdate(() => {
  itemRefs.value = [];
});

// 获取列表项位置
const getItemPosition = (index: number) => {
  const cachedPosition = state.positions.get(index);
  if (cachedPosition) {
    return cachedPosition;
  }

  const lastMeasuredPosition = state.positions.get(state.lastMeasuredIndex);
  const lastMeasuredBottom = lastMeasuredPosition ? lastMeasuredPosition.bottom : 0;

  const top =
    index > state.lastMeasuredIndex
      ? lastMeasuredBottom + (index - state.lastMeasuredIndex - 1) * state.estimatedItemHeight
      : index * state.estimatedItemHeight;

  return {
    top,
    bottom: top + state.estimatedItemHeight,
    height: state.estimatedItemHeight
  };
};

// 二分查找优化
const findStartIndex = (scrollTop: number): number => {
  let low = 0;
  let high = state.listData.length - 1;
  let mid = 0;

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2);
    const midPosition = getItemPosition(mid);

    if (midPosition.bottom === scrollTop) {
      return mid;
    }

    if (midPosition.bottom < scrollTop) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return Math.max(0, low - state.bufferSize);
};

// 计算可视范围
const calculateRange = computed(() => {
  const startIndex = findStartIndex(state.scrollTop);
  const visibleCount = Math.ceil(state.viewportHeight / state.estimatedItemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 2 * state.bufferSize, state.listData.length - 1);

  return {
    startIndex,
    endIndex
  };
});

// 监听范围变化
watch(
  calculateRange,
  range => {
    viewRange.startIndex = range.startIndex;
    viewRange.endIndex = range.endIndex;
  },
  { immediate: true }
);

// 计算可视区域数据
const visibleData = computed(() => {
  return Array.from({ length: viewRange.endIndex - viewRange.startIndex + 1 }, (_, i) => ({
    index: viewRange.startIndex + i,
    data: state.listData[viewRange.startIndex + i]
  }));
});

// 计算偏移量
const offset = computed(() => {
  if (viewRange.startIndex <= 0) return 0;
  const position = getItemPosition(viewRange.startIndex);
  return position.top;
});

// 计算总高度
const totalHeight = computed(() => {
  return state.listData.length * state.estimatedItemHeight;
});

// 更新位置缓存
const updatePositions = () => {
  if (state.isUpdating) return;
  state.isUpdating = true;

  try {
    let maxBottomPosition = 0;
    const items = itemRefs.value.filter(Boolean);

    if (!items.length) return;

    items.forEach(node => {
      if (!node) return;
      const index = parseInt(node.getAttribute("data-index") || "0");
      const rect = node.getBoundingClientRect();
      const height = rect.height;

      const oldPosition = state.positions.get(index);
      const top = oldPosition ? oldPosition.top : index > 0 ? state.positions.get(index - 1)?.bottom || 0 : 0;

      const bottom = top + height;
      maxBottomPosition = Math.max(maxBottomPosition, bottom);

      state.positions.set(index, { top, bottom, height });
      state.lastMeasuredIndex = Math.max(state.lastMeasuredIndex, index);
    });

    if (viewRange.endIndex > state.lastMeasuredIndex) {
      const remainingItems = viewRange.endIndex - state.lastMeasuredIndex;
      for (let i = 1; i <= remainingItems; i++) {
        const index = state.lastMeasuredIndex + i;
        const top = maxBottomPosition + (i - 1) * state.estimatedItemHeight;

        if (!state.positions.has(index)) {
          state.positions.set(index, {
            top,
            bottom: top + state.estimatedItemHeight,
            height: state.estimatedItemHeight
          });
        }
      }
    }
  } finally {
    state.isUpdating = false;
  }
};

// 滚动处理
const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  const currentScrollTop = target.scrollTop;

  if (Math.abs(currentScrollTop - state.scrollTop) > state.estimatedItemHeight / 3) {
    state.scrollTop = currentScrollTop;
    requestAnimationFrame(updatePositions);
  }
};

// 初始化
onMounted(() => {
  if (listRef.value) {
    state.viewportHeight = listRef.value.clientHeight;
  }
  updatePositions();
});
</script>

<style lang="scss" scoped>
.virtual-list-container {
  width: 500px;
  height: 400px;
  margin: 20px auto;
  overflow: hidden;
  position: relative;
  border: 1px solid #eee;
}

.virtual-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.virtual-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  overflow: auto;
  height: 100%;
}

.list-items {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  will-change: transform;
}

.list-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  background: #fff;
}
</style>
