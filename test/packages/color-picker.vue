<template>
  <div class="test-container">
    <h2>ColorPicker 颜色选择器组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="color-demo">
        <t-color-picker v-model="colors.default" />
        <div class="color-value">当前值: {{ colors.default }}</div>
      </div>
    </test-section>

    <!-- 支持透明度选择 -->
    <test-section title="支持透明度选择">
      <div class="color-demo">
        <t-color-picker v-model="colors.alpha" show-alpha />
        <div class="color-value">当前值: {{ colors.alpha }}</div>
      </div>
    </test-section>

    <!-- 预定义颜色 -->
    <test-section title="预定义颜色">
      <div class="color-demo">
        <t-color-picker v-model="colors.predefine" :predefine="predefineColors" />
        <div class="color-value">当前值: {{ colors.predefine }}</div>
      </div>
    </test-section>

    <!-- 不同尺寸 -->
    <test-section title="不同尺寸">
      <div class="color-demo-row">
        <div>
          <t-color-picker v-model="colors.small" size="small" />
          <div class="color-label">小型</div>
        </div>
        <div>
          <t-color-picker v-model="colors.default" size="default" />
          <div class="color-label">默认</div>
        </div>
        <div>
          <t-color-picker v-model="colors.large" size="large" />
          <div class="color-label">大型</div>
        </div>
      </div>
    </test-section>

    <!-- 不同颜色格式 -->
    <test-section title="不同颜色格式">
      <div class="color-demo-row">
        <div>
          <t-color-picker v-model="colors.hex" color-format="hex" />
          <div class="color-value">HEX: {{ colors.hex }}</div>
        </div>
        <div>
          <t-color-picker v-model="colors.rgb" color-format="rgb" />
          <div class="color-value">RGB: {{ colors.rgb }}</div>
        </div>
        <div>
          <t-color-picker v-model="colors.rgba" color-format="rgba" show-alpha />
          <div class="color-value">RGBA: {{ colors.rgba }}</div>
        </div>
      </div>
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <div class="color-demo">
        <t-color-picker v-model="colors.disabled" disabled />
        <div class="color-value">当前值: {{ colors.disabled }}</div>
      </div>
    </test-section>

    <!-- 清空颜色 -->
    <test-section title="清空颜色">
      <div class="color-demo">
        <t-color-picker v-model="colors.clearable" />
        <div class="color-value">当前值: {{ colors.clearable || "无" }}</div>
        <t-button @click="colors.clearable = ''">手动清空</t-button>
      </div>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <div class="color-demo">
        <t-color-picker v-model="colors.events" @change="handleChange" @active-change="handleActiveChange" />
        <div class="color-value">当前值: {{ colors.events }}</div>
        <div class="event-log">
          <div>事件日志:</div>
          <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
            {{ log }}
          </div>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TColorPicker } from "@/packages/color-picker";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "ColorPickerTest" });

// 颜色值
const colors = ref({
  default: "#409EFF",
  alpha: "rgba(64, 158, 255, 0.68)",
  predefine: "#409EFF",
  small: "#67C23A",
  large: "#E6A23C",
  hex: "#F56C6C",
  rgb: "rgb(103, 194, 58)",
  rgba: "rgba(64, 158, 255, 0.68)",
  disabled: "#409EFF",
  clearable: "#409EFF",
  events: "#409EFF"
});

// 预定义颜色
const predefineColors = [
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "#ff69b4",
  "#ff0000",
  "#ff7f50"
];

// 事件日志
const eventLogs = ref<string[]>([]);

// 处理颜色变化事件
const handleChange = (value: string) => {
  eventLogs.value.unshift(`change: ${value}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

// 处理面板当前颜色变化事件
const handleActiveChange = (value: string) => {
  eventLogs.value.unshift(`active-change: ${value}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
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

  .color-demo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .color-demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
  }

  .color-value {
    margin-top: 8px;
    font-size: 14px;
    color: #606266;
  }

  .color-label {
    margin-top: 8px;
    font-size: 14px;
    color: #606266;
  }

  .event-log {
    margin-top: 16px;
    width: 100%;
    max-width: 300px;
    padding: 12px;
    background-color: #f5f7fa;
    border-radius: 4px;
    font-size: 14px;
    color: #606266;

    .log-item {
      margin-top: 8px;
      padding: 6px;
      background-color: #ffffff;
      border-radius: 2px;
      font-family: monospace;
    }
  }
}
</style>
