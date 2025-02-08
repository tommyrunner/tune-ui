<template>
  <div class="test-container">
    <h2>Radio 单选框组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-radio v-model="radio1" :value="true">单选框</t-radio>
      <t-radio v-model="radio2" value="选项1">选项1</t-radio>
      <t-radio v-model="radio2" value="选项2">选项2</t-radio>
      <t-radio disabled>禁用状态</t-radio>
    </test-section>

    <!-- 单选框组 -->
    <test-section title="单选框组">
      <t-radio-group v-model="groupValue1">
        <t-radio value="1">选项1</t-radio>
        <t-radio value="2">选项2</t-radio>
        <t-radio value="3">选项3</t-radio>
        <t-radio value="4" disabled>禁用选项</t-radio>
      </t-radio-group>
    </test-section>

    <!-- 不同类型 -->
    <test-section title="不同类型">
      <div class="group-item">
        <h4>默认类型</h4>
        <t-radio-group v-model="groupValue2" type="default">
          <t-radio value="1">选项1</t-radio>
          <t-radio value="2">选项2</t-radio>
          <t-radio value="3">选项3</t-radio>
        </t-radio-group>
      </div>

      <div class="group-item">
        <h4>文本类型</h4>
        <t-radio-group v-model="groupValue3" type="text">
          <t-radio value="1">选项1</t-radio>
          <t-radio value="2">选项2</t-radio>
          <t-radio value="3">选项3</t-radio>
        </t-radio-group>
      </div>

      <div class="group-item">
        <h4>边框类型</h4>
        <t-radio-group v-model="groupValue4" type="border">
          <t-radio value="1">选项1</t-radio>
          <t-radio value="2">选项2</t-radio>
          <t-radio value="3">选项3</t-radio>
        </t-radio-group>
      </div>

      <div class="group-item">
        <h4>按钮类型</h4>
        <t-radio-group v-model="groupValue5" type="button">
          <t-radio value="1">选项1</t-radio>
          <t-radio value="2">选项2</t-radio>
          <t-radio value="3">选项3</t-radio>
        </t-radio-group>
      </div>
    </test-section>

    <!-- 不同尺寸 -->
    <test-section title="不同尺寸">
      <div class="group-item">
        <t-radio-group v-model="groupValue6" type="button">
          <t-radio value="1" size="small">小型</t-radio>
          <t-radio value="2" size="default">默认</t-radio>
          <t-radio value="3" size="large">大型</t-radio>
        </t-radio-group>
      </div>
    </test-section>

    <!-- 不同方向 -->
    <test-section title="不同方向">
      <div class="group-item">
        <h4>横向排列</h4>
        <t-radio-group v-model="groupValue7" direction="row">
          <t-radio value="1">选项1</t-radio>
          <t-radio value="2">选项2</t-radio>
          <t-radio value="3">选项3</t-radio>
        </t-radio-group>
      </div>

      <div class="group-item">
        <h4>纵向排列</h4>
        <t-radio-group v-model="groupValue8" direction="column">
          <t-radio value="1">选项1</t-radio>
          <t-radio value="2">选项2</t-radio>
          <t-radio value="3">选项3</t-radio>
        </t-radio-group>
      </div>
    </test-section>

    <!-- 自定义图标 -->
    <test-section title="自定义图标">
      <t-radio v-model="radio3" :value="true" icon="success-to">自定义图标</t-radio>
      <t-radio v-model="radio3" :value="false" icon="close">自定义图标</t-radio>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-radio-group v-model="groupValue9" @change="handleGroupChange">
        <t-radio value="1" @change="handleRadioChange">选项1</t-radio>
        <t-radio value="2" @change="handleRadioChange">选项2</t-radio>
        <t-radio value="3" @change="handleRadioChange">选项3</t-radio>
      </t-radio-group>
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
import { TRadio, TRadioGroup } from "@/packages/radio";
import TestSection from "./components/test-section.vue";

defineOptions({ name: "RadioTest" });

// 基础用法
const radio1 = ref(false);
const radio2 = ref("选项1");
const radio3 = ref(true);

// 单选框组
const groupValue1 = ref("1");
const groupValue2 = ref("1");
const groupValue3 = ref("1");
const groupValue4 = ref("1");
const groupValue5 = ref("1");
const groupValue6 = ref("1");
const groupValue7 = ref("1");
const groupValue8 = ref("1");
const groupValue9 = ref("1");

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
const handleRadioChange = (value: string | number | boolean) => {
  addLog(`单选框值改变: ${value}`);
};

const handleGroupChange = (value: string | number) => {
  addLog(`单选框组值改变: ${value}`);
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

  .group-item {
    margin-bottom: 20px;

    h4 {
      margin: 0 0 12px;
      font-size: 14px;
      color: #666;
    }
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