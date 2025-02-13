<template>
  <div class="list-view-test">
    <h3>ListView 列表视图</h3>

    <TScrollbar style="height: 300px">
      <div class="box"></div>
    </TScrollbar>

    <!-- 基础用法 -->
    <div class="test-block">
      <h4>基础用法</h4>
      <TListView :height="400" :listData="basicListData">
        <template #default="{ row, index }">
          <TListViewItem>
            <div class="list-item">{{ index + 1 }}. {{ row.content }}</div>
          </TListViewItem>
        </template>
      </TListView>
    </div>

    <!-- 虚拟列表 -->
    <div class="test-block">
      <h4>虚拟列表</h4>
      <TListView height="300px" :isVirtualized="true" :listData="virtualListData">
        <template #default="{ index }">
          <TListViewItem>
            <!-- 根据index计算高度 -->
            <div :style="{ height: `${(index + 1) * 20}px`, borderBottom: '1px solid #000' }">{{ index + 1 }}</div>
          </TListViewItem>
        </template>
      </TListView>
    </div>

    <!-- 列表方向 -->
    <!-- <div class="test-block">
      <h4>列表方向</h4>
      <TListView height="200px" direction="row" :listData="directionListData">
        <template #default="{ row }">
          <TListViewItem>
            <div class="list-item-row">{{ row.content }}</div>
          </TListViewItem>
        </template>
      </TListView>
    </div> -->

    <!-- 固定项 -->
    <!-- <div class="test-block">
      <h4>固定项</h4>
      <TListView height="300px" :listData="fixedListData">
        <template #head="{ itemBind }">
          <div class="list-header" :style="{ height: itemBind.height }">列表头部</div>
        </template>
        <template #default="{ row, index }">
          <TListViewItem :fixed="index === 0">
            <div class="list-item" :class="{ 'is-fixed': index === 0 }">
              {{ row.content }}
            </div>
          </TListViewItem>
        </template>
        <template #foot="{ itemBind }">
          <div class="list-footer" :style="{ height: itemBind.height }">列表底部</div>
        </template>
      </TListView>
    </div> -->

    <!-- 事件测试 -->
    <!-- <div class="test-block">
      <h4>事件测试</h4>
      <TListView height="200px" :listData="eventListData" @scroll="handleScroll" @updateView="handleUpdateView">
        <template #default="{ row }">
          <TListViewItem>
            <div class="list-item">{{ row.content }}</div>
          </TListViewItem>
        </template>
      </TListView>
      <div class="event-log">
        <p>滚动事件：{{ scrollInfo }}</p>
        <p>视图更新：{{ updateInfo }}</p>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TListView, TListViewItem } from "@/packages/listView";
import { TScrollbar } from "@/packages/scrollbar";

interface ListItem {
  id: number;
  content: string;
}

// 生成测试数据
const createListData = (count: number, prefix = ""): ListItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    content: `${prefix}列表项 ${i + 1}`
  }));
};

// 基础列表数据
const basicListData = ref<ListItem[]>(createListData(10, "基础"));

// 虚拟列表数据
const virtualListData = ref<ListItem[]>(createListData(1000, "虚拟"));

// 方向列表数据
const directionListData = ref<ListItem[]>(createListData(10, "横向"));

// 固定项列表数据
const fixedListData = ref<ListItem[]>(createListData(20, "固定"));

// 事件测试列表数据
const eventListData = ref<ListItem[]>(createListData(50, "事件"));

// 事件记录
const scrollInfo = ref("未触发");
const updateInfo = ref("未触发");

// 事件处理
const handleScroll = (element: HTMLElement) => {
  scrollInfo.value = `位置: ${element.scrollTop}px`;
};

const handleUpdateView = (element: HTMLElement) => {
  updateInfo.value = `更新时间: ${new Date().toLocaleTimeString()}`;
};
</script>

<style lang="scss" scoped>
.list-view-test {
  padding: 20px;

  .test-block {
    margin-bottom: 30px;

    h4 {
      margin: 10px 0;
      color: #666;
    }
  }

  .list-item {
    padding: 12px;
    border-bottom: 1px solid #eee;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f7fa;
    }

    &.is-fixed {
      background-color: #e6f7ff;
      font-weight: bold;
    }
  }

  .list-item-row {
    padding: 12px;
    border-right: 1px solid #eee;
    display: inline-block;
  }

  .list-header,
  .list-footer {
    padding: 12px;
    background: #fafafa;
    text-align: center;
    font-weight: bold;
  }

  .event-log {
    margin-top: 10px;
    padding: 10px;
    background: #f5f7fa;
    border-radius: 4px;

    p {
      margin: 5px 0;
      color: #666;
    }
  }
}
.box {
  width: 100%;
  height: 10000px;
  border: 1px solid #000;
}
</style>
