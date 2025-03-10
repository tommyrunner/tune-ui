<template>
  <div class="test-container">
    <h2>Switch 开关组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-switch v-model="switch1" />
      <t-switch v-model="switch2" disabled />
      <t-switch v-model="switch3" loading />
    </test-section>

    <!-- 不同尺寸 -->
    <test-section title="不同尺寸">
      <div class="size-group">
        <t-switch v-model="switch4" size="small" />
        <t-switch v-model="switch4" size="default" />
        <t-switch v-model="switch4" size="large" />
      </div>
    </test-section>

    <!-- 不同圆角 -->
    <test-section title="不同圆角">
      <t-switch v-model="switch5" radius="default" />
      <t-switch v-model="switch5" radius="square" />
    </test-section>

    <!-- 自定义颜色 -->
    <test-section title="自定义颜色">
      <t-switch v-model="switch6" onBgColor="#52c41a" offBgColor="#ff4d4f" />
      <t-switch v-model="switch7" onBgColor="#1890ff" offBgColor="#faad14" />
    </test-section>

    <!-- 自定义内容 -->
    <test-section title="自定义内容">
      <t-switch v-model="switch8">
        <template #onContent>
          <span class="switch-text">开</span>
        </template>
        <template #offContent>
          <span class="switch-text">关</span>
        </template>
      </t-switch>
      <t-switch v-model="switch9">
        <template #onContent>
          <span class="switch-text">ON</span>
        </template>
        <template #offContent>
          <span class="switch-text">OFF</span>
        </template>
      </t-switch>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-switch v-model="switch10" @change="handleChange" />
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
import { TSwitch } from "@/packages/switch";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "SwitchTest" });

// 基础用法
const switch1 = ref(false);
const switch2 = ref(true);
const switch3 = ref(false);

// 不同尺寸
const switch4 = ref(true);

// 不同圆角
const switch5 = ref(true);

// 自定义颜色
const switch6 = ref(false);
const switch7 = ref(true);

// 自定义内容
const switch8 = ref(false);
const switch9 = ref(true);

// 事件测试
const switch10 = ref(false);

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
const handleChange = (value: boolean) => {
  addLog(`开关状态改变: ${value ? "开启" : "关闭"}`);
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

  .size-group {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  :deep(.test-section) {
    .t-switch {
      margin-right: 16px;
    }
  }

  .switch-text {
    font-size: 12px;
    color: #fff;
    font-weight: 500;
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
