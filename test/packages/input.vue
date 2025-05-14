<template>
  <div class="test-container">
    <h2>Input 输入框组件</h2>

    <!-- 基础输入框 -->
    <test-section title="基础输入框">
      <div class="input-row">
        <t-input v-model="inputValue" />
        <div class="value-display">当前值: {{ inputValue }}</div>
      </div>
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <div class="input-row">
        <t-input disabled placeholder="禁用状态" />
      </div>
    </test-section>

    <!-- 密码输入框 -->
    <test-section title="密码输入框">
      <div class="input-row">
        <t-input v-model="password" password placeholder="请输入密码" />
      </div>
    </test-section>

    <!-- 最大长度 -->
    <test-section title="最大长度">
      <div class="input-row">
        <t-input v-model="maxValue" :maxLength="10" placeholder="最多输入10个字符" />
        <div class="value-display">当前长度: {{ maxValue.length }}/10</div>
      </div>
    </test-section>

    <!-- 清除按钮 -->
    <test-section title="清除按钮">
      <div class="input-row">
        <t-input v-model="clearValue" clearable placeholder="点击清除内容" />
        <t-input v-model="clearValue" :clearable="false" placeholder="禁用清除按钮" />
      </div>
    </test-section>

    <!-- 输入框尺寸 -->
    <test-section title="输入框尺寸">
      <div class="input-row">
        <t-input size="small" placeholder="小型输入框" />
        <t-input size="default" placeholder="默认输入框" />
        <t-input size="large" placeholder="大型输入框" />
      </div>
    </test-section>

    <!-- 防抖输入 -->
    <test-section title="防抖输入">
      <div class="input-row">
        <t-input v-model="debounceValue" :debounce="handleDebounce" :debounceDelay="1000" placeholder="延迟1秒触发" />
        <div class="value-display">实时值: {{ debounceValue }}</div>
        <div class="value-display">防抖值: {{ debounceResult }}</div>
      </div>
    </test-section>

    <!-- 提示信息 -->
    <test-section title="提示信息">
      <div class="input-row">
        <t-input v-model="tipValue" isTip placeholder="输入内容显示提示" />
        <t-input v-model="tipValue" :isTip="false" placeholder="禁用提示" />
      </div>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <div class="input-row">
        <t-input
          v-model="eventValue"
          clearable
          placeholder="触发事件"
          @focus="handleFocus"
          @blur="handleBlur"
          @enter="handleEnter"
          @input="handleInput"
          @clear="handleClear"
        />
      </div>
      <div class="event-log">
        <div class="event-title">事件记录:</div>
        <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
          {{ event }}
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TInput } from "@/packages/input";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "InputTest" });

// 输入值
const inputValue = ref("");
const password = ref("");
const maxValue = ref("");
const clearValue = ref("");
const debounceValue = ref("");
const tipValue = ref("");
const eventValue = ref("");

// 防抖结果
const debounceResult = ref("");

// 事件记录
const eventLogs = ref<string[]>([]);

/**
 * 处理防抖输入
 */
const handleDebounce = (value?: string) => {
  debounceResult.value = value || "";
};

/**
 * 处理获得焦点
 */
const handleFocus = (value?: string) => {
  eventLogs.value.unshift(`获得焦点: ${value}`);
};

/**
 * 处理失去焦点
 */
const handleBlur = (value?: string) => {
  eventLogs.value.unshift(`失去焦点: ${value}`);
};

/**
 * 处理回车事件
 */
const handleEnter = (value?: string) => {
  eventLogs.value.unshift(`按下回车: ${value}`);
};

/**
 * 处理输入事件
 */
const handleInput = (value?: string) => {
  eventLogs.value.unshift(`输入值: ${value}`);
  // 只保留最近5条记录
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * 处理清除事件
 */
const handleClear = () => {
  eventLogs.value.unshift("清除内容");
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 24px;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 12px;
  }

  .input-row {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 16px;
    align-items: center;

    .t-input {
      width: 240px;
    }
  }

  .value-display {
    padding: 8px 12px;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    color: #4b5563;
    font-size: 14px;
  }

  .event-log {
    margin-top: 16px;
    padding: 16px;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 6px;

    .event-title {
      margin-bottom: 12px;
      font-weight: 600;
      color: #374151;
    }

    .event-item {
      padding: 6px 8px;
      margin-bottom: 4px;
      background-color: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-family: ui-monospace, monospace;
      font-size: 13px;
      color: #4b5563;
    }
  }
}
</style>
