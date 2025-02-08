<template>
  <div class="test-container">
    <h2>Rate 评分组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-rate v-model="rate1" />
      <t-rate v-model="rate2" disabled />
    </test-section>

    <!-- 不同尺寸 -->
    <test-section title="不同尺寸">
      <div class="size-group">
        <t-rate v-model="rate3" size="small" />
        <t-rate v-model="rate3" size="default" />
        <t-rate v-model="rate3" size="large" />
      </div>
    </test-section>

    <!-- 自定义图标 -->
    <test-section title="自定义图标">
      <t-rate
        v-model="rate4"
        :icon="{
          empty: 'xiaoxue',
          half: 'vertical-more',
          show: 'vertical-reduce'
        }"
      />
      <t-rate
        v-model="rate5"
        :icon="{
          empty: 'xiaoyu',
          half: 'vertical-widen',
          show: 'weibo'
        }"
      />
    </test-section>

    <!-- 自定义颜色 -->
    <test-section title="自定义颜色">
      <t-rate
        v-model="rate6"
        :color="{
          2: '#ff4d4f',
          3: '#faad14',
          4: '#52c41a',
          5: '#1890ff'
        }"
      />
    </test-section>

    <!-- 自定义间距 -->
    <test-section title="自定义间距">
      <div class="gap-group">
        <t-rate v-model="rate7" :gap="2" />
        <t-rate v-model="rate7" :gap="8" />
        <t-rate v-model="rate7" :gap="16" />
      </div>
    </test-section>

    <!-- 最大评分 -->
    <test-section title="最大评分">
      <t-rate v-model="rate8" :max="3" />
      <t-rate v-model="rate9" :max="7" />
    </test-section>

    <!-- 半选模式 -->
    <test-section title="半选模式">
      <t-rate v-model="rate10" :is-half="true" />
      <t-rate v-model="rate11" :is-half="false" />
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-rate v-model="rate12" @change="handleChange" />
      <div class="event-log" v-if="logs.length">
        <div class="event-title">事件记录：</div>
        <div v-for="(log, index) in logs" :key="index" class="event-item">
          {{ log }}
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TRate } from "@/packages/rate";
import TestSection from "./components/test-section.vue";

defineOptions({ name: "RateTest" });

// 基础用法
const rate1 = ref(3);
const rate2 = ref(4);

// 不同尺寸
const rate3 = ref(3);

// 自定义图标
const rate4 = ref(2);
const rate5 = ref(3);

// 自定义颜色
const rate6 = ref(3);

// 自定义间距
const rate7 = ref(4);

// 最大评分
const rate8 = ref(2);
const rate9 = ref(5);

// 半选模式
const rate10 = ref(2.5);
const rate11 = ref(3);

// 事件测试
const rate12 = ref(0);

// 事件日志
const logs = ref<string[]>([]);

// 添加日志
const addLog = (message: string) => {
  logs.value.unshift(message);
  if (logs.value.length > 5) {
    logs.value.pop();
  }
};

// 事件处理
const handleChange = (value: number) => {
  addLog(`评分改变: ${value}`);
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
  }

  .size-group,
  .gap-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .event-log {
    margin-top: 16px;
    padding: 12px;
    background-color: #f9fafb;
    border-radius: 4px;

    .event-title {
      margin-bottom: 8px;
      font-weight: 500;
      color: #374151;
    }

    .event-item {
      padding: 4px 0;
      color: #666;
      font-size: 14px;
      font-family: monospace;
    }
  }
}
</style>
