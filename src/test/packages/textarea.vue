<template>
  <div class="test-container">
    <h2>Textarea 文本域组件</h2>

    <!-- 基础文本域 -->
    <test-section title="基础文本域">
      <t-textarea v-model="textValue" placeholder="请输入内容" />
      <div class="value-display">当前值: {{ textValue }}</div>
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <t-textarea disabled placeholder="禁用状态" />
    </test-section>

    <!-- 调整大小 -->
    <test-section title="调整大小">
      <t-textarea placeholder="可调整大小（默认）" />
      <t-textarea :isResize="false" placeholder="禁止调整大小" />
    </test-section>

    <!-- 换行控制 -->
    <test-section title="换行控制">
      <div class="textarea-group">
        <div class="textarea-item">
          <div class="textarea-label">允许换行（默认）：</div>
          <t-textarea v-model="enterValue" placeholder="可以使用回车换行" />
        </div>
        <div class="textarea-item">
          <div class="textarea-label">禁止换行：</div>
          <t-textarea v-model="noEnterValue" :isEnter="false" placeholder="无法使用回车换行" />
        </div>
      </div>
    </test-section>

    <!-- 字数限制 -->
    <test-section title="字数限制">
      <div class="textarea-group">
        <div class="textarea-item">
          <div class="textarea-label">显示光标行数：</div>
          <t-textarea v-model="maxValue" :maxLength="50" :isCursor="true" placeholder="最多输入50个字符" />
        </div>
        <div class="textarea-item">
          <div class="textarea-label">不显示光标行数：</div>
          <t-textarea v-model="maxValue" :maxLength="50" :isCursor="false" placeholder="最多输入50个字符" />
        </div>
      </div>
      <div class="value-display">当前长度: {{ maxValue.length }}/50</div>
    </test-section>

    <!-- 防抖输入 -->
    <test-section title="防抖输入">
      <t-textarea v-model="debounceValue" :debounce="handleDebounce" :debounceDelay="1000" placeholder="延迟1秒触发" />
      <div class="value-display">实时值: {{ debounceValue }}</div>
      <div class="value-display">防抖值: {{ debounceResult }}</div>
    </test-section>

    <!-- 提示信息 -->
    <test-section title="提示信息">
      <div class="textarea-group">
        <div class="textarea-item">
          <div class="textarea-label">显示提示（默认）：</div>
          <t-textarea v-model="tipValue" isTip placeholder="输入内容显示提示" />
        </div>
        <div class="textarea-item">
          <div class="textarea-label">禁用提示：</div>
          <t-textarea v-model="tipValue" :isTip="false" placeholder="禁用提示信息" />
        </div>
      </div>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-textarea
        v-model="eventValue"
        placeholder="触发事件"
        @focus="handleFocus"
        @blur="handleBlur"
        @enter="handleEnter"
        @input="handleInput"
      />
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
import { TTextarea } from "@/packages/textarea";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "TextareaTest" });

// 输入值
const textValue = ref("");
const enterValue = ref("");
const noEnterValue = ref("");
const maxValue = ref("");
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
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
  }

  .textarea-group {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .textarea-item {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .textarea-label {
        font-size: 14px;
        color: #666;
      }

      .t-textarea {
        width: 100%;
      }
    }
  }

  .value-display {
    margin-top: 8px;
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
