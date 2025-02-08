<template>
  <div class="test-container">
    <h2>InputNumber 数值输入框组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="input-row">
        <t-input-number v-model="value1" placeholder="请输入数字" />
        <div class="value-display">当前值: {{ value1 }}</div>
      </div>
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <div class="input-row">
        <t-input-number v-model="value2" disabled placeholder="禁用状态" />
      </div>
    </test-section>

    <!-- 步长设置 -->
    <test-section title="步长设置">
      <div class="input-row">
        <t-input-number v-model="value3" :step="5" placeholder="步长为5" />
        <t-input-number v-model="value3" :step="10" placeholder="步长为10" />
      </div>
    </test-section>

    <!-- 最大最小值 -->
    <test-section title="最大最小值">
      <div class="input-row">
        <t-input-number v-model="value2" :min-value="0" :max-value="100" placeholder="范围: 0-100" />
        <div class="value-display">当前值: {{ value2 }}</div>
      </div>
    </test-section>

    <!-- 控制按钮 -->
    <test-section title="控制按钮">
      <div class="input-row">
        <t-input-number v-model="value5" :is-controls="true" placeholder="显示控制按钮" />
        <t-input-number v-model="value5" :is-controls="false" placeholder="隐藏控制按钮" />
      </div>
    </test-section>

    <!-- 输入框尺寸 -->
    <test-section title="输入框尺寸">
      <div class="input-row">
        <t-input-number v-model="value6" size="small" placeholder="小型输入框" />
        <t-input-number v-model="value6" size="default" placeholder="默认输入框" />
        <t-input-number v-model="value6" size="large" placeholder="大型输入框" />
      </div>
    </test-section>

    <!-- 范围输入基础 -->
    <test-section title="范围输入基础">
      <div class="input-row">
        <t-input-number v-model="rangeValue1" :is-range="true" placeholder="请输入范围" />
        <div class="value-display">当前值: [{{ rangeValue1[0] }}, {{ rangeValue1[1] }}]</div>
      </div>
    </test-section>

    <!-- 范围输入限制 -->
    <test-section title="范围输入限制">
      <div class="input-row">
        <t-input-number v-model="rangeValue2" :is-range="true" :min-value="0" :max-value="100" placeholder="范围限制: 0-100" />
        <div class="value-display">当前值: [{{ rangeValue2[0] }}, {{ rangeValue2[1] }}]</div>
      </div>
    </test-section>

    <!-- 范围输入步长 -->
    <test-section title="范围输入步长">
      <div class="input-row">
        <t-input-number v-model="rangeValue3" :is-range="true" :step="5" :min-value="0" :max-value="100" placeholder="步长为5" />
        <div class="value-display">当前值: [{{ rangeValue3[0] }}, {{ rangeValue3[1] }}]</div>
      </div>
    </test-section>

    <!-- 防抖输入 -->
    <test-section title="防抖输入">
      <div class="input-row">
        <t-input-number v-model="value7" :debounce="handleDebounce" :debounce-delay="1000" placeholder="延迟1秒触发" />
      </div>
      <div class="event-log">
        <div class="event-title">事件记录:</div>
        <div v-for="(log, index) in eventLogs" :key="index" class="event-item">{{ log }}</div>
      </div>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <div class="input-row">
        <t-input-number
          v-model="value3"
          placeholder="触发事件测试"
          @focus="handleFocus"
          @blur="handleBlur"
          @enter="handleEnter"
          @input="handleInput"
        />
      </div>
      <div class="event-log">
        <div class="event-title">事件记录:</div>
        <div v-for="(log, index) in eventLogs" :key="index" class="event-item">{{ log }}</div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TInputNumber } from "@/packages/input-number";
import TestSection from "./components/test-section.vue";

defineOptions({ name: "InputNumberTest" });

// 基础值
const value1 = ref<number>(0);
const value2 = ref<number>(50);
const value3 = ref<number>(0);
const value5 = ref<number>(0);
const value6 = ref<number>();
const value7 = ref<number>();

// 范围值
const rangeValue1 = ref<number[]>([0, 100]); // 基础范围
const rangeValue2 = ref<number[]>([20, 80]); // 限制范围
const rangeValue3 = ref<number[]>([0, 50]); // 步进范围

// 事件日志
const eventLogs = ref<string[]>([]);

/**
 * 处理防抖回调
 */
const handleDebounce = (value?: number) => {
  eventLogs.value.unshift(`防抖输入: ${value}`);
};

/**
 * 处理获得焦点
 */
const handleFocus = (value?: number) => {
  eventLogs.value.unshift(`获得焦点: ${value}`);
};

/**
 * 处理失去焦点
 */
const handleBlur = (value?: number) => {
  eventLogs.value.unshift(`失去焦点: ${value}`);
};

/**
 * 处理回车事件
 */
const handleEnter = (value?: number) => {
  eventLogs.value.unshift(`回车事件: ${value}`);
};

/**
 * 处理输入事件
 */
const handleInput = (value?: number) => {
  eventLogs.value.unshift(`输入事件: ${value}`);
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

  .input-row {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;

    .t-input-number {
      min-width: 200px;
    }
  }

  .value-display {
    color: #666;
    font-size: 14px;
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
