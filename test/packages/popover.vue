<template>
  <div class="test-container">
    <h2>Popover 弹出框组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="popover-wrapper">
        <t-popover content="这是一个基础弹出框">
          <t-button type="primary" prefixIcon="information">hover触发</t-button>
        </t-popover>
        <t-popover content="点击触发的弹出框" type="click">
          <t-button type="success" prefixIcon="position">click触发</t-button>
        </t-popover>
        <t-popover content="禁用状态的弹出框" disabled>
          <t-button type="info" prefixIcon="close">禁用状态</t-button>
        </t-popover>
      </div>
    </test-section>
    <!-- 分组用法 -->
    <test-section title="分组用法">
      <t-popover content="这是一组弹出框" style="display: flex; gap: 12px">
        <t-button type="info">按钮1</t-button>
        <t-button type="info">按钮2</t-button>
        <t-button type="info">按钮3</t-button>
        <t-button type="info">按钮4</t-button>
      </t-popover>
    </test-section>

    <!-- 弹出位置 -->
    <test-section title="弹出位置">
      <div class="position-group">
        <t-popover content="顶部弹出" position="top">
          <t-button type="primary" prefixIcon="up">上</t-button>
        </t-popover>
        <t-popover content="右侧弹出" position="right">
          <t-button type="primary" prefixIcon="right">右</t-button>
        </t-popover>
        <t-popover content="底部弹出" position="bottom">
          <t-button type="primary" prefixIcon="downward">下</t-button>
        </t-popover>
        <t-popover content="左侧弹出" position="left">
          <t-button type="primary" prefixIcon="left">左</t-button>
        </t-popover>
      </div>
    </test-section>

    <!-- 自定义样式 -->
    <test-section title="自定义样式">
      <div class="button-group">
        <t-popover
          content="自定义样式的弹出框"
          :width="'200px'"
          :radius="[8, 8, 8, 8]"
          :padding="[12, 16, 12, 16]"
          :box-shadow="[0, 4, 12, 'rgba(0, 0, 0, 0.1)']"
        >
          <t-button type="warning" prefixIcon="edit">自定义样式</t-button>
        </t-popover>
        <t-popover content="无箭头弹出框" :show-arrow="false">
          <t-button type="info" prefixIcon="close">无箭头</t-button>
        </t-popover>
        <t-popover content="自定义间距" :gap="20">
          <t-button type="success" prefixIcon="position">自定义间距</t-button>
        </t-popover>
      </div>
    </test-section>

    <!-- 自定义内容 -->
    <test-section title="自定义内容">
      <t-popover>
        <template #content>
          <div class="custom-content">
            <h4>自定义内容</h4>
            <p>这里可以放任何内容</p>
            <t-button type="primary" size="small">操作按钮</t-button>
          </div>
        </template>
        <t-button type="primary" prefixIcon="edit">自定义内容</t-button>
      </t-popover>
    </test-section>

    <!-- 触发配置 -->
    <test-section title="触发配置">
      <div class="button-group">
        <t-popover content="延迟隐藏" :hide-after="1000">
          <t-button type="info">延迟隐藏</t-button>
        </t-popover>
        <t-popover content="ESC关闭" type="click" :close-on-press-escape="true">
          <t-button type="danger" prefixIcon="close">ESC关闭</t-button>
        </t-popover>
        <t-popover content="点击其他区域关闭" type="click" :close-on-press-other="true">
          <t-button type="warning" prefixIcon="position">点击其他关闭</t-button>
        </t-popover>
      </div>
    </test-section>

    <!-- 遮罩层 -->
    <test-section title="遮罩层">
      <div class="button-group">
        <t-popover content="带遮罩层" type="click" :is-modal="true">
          <t-button>遮罩层</t-button>
        </t-popover>
        <t-popover content="嵌套遮罩" type="click" :is-modal="true" :is-modal-nest="true">
          <t-button>嵌套遮罩</t-button>
        </t-popover>
      </div>
    </test-section>

    <!-- 自定义位置 -->
    <test-section title="自定义位置">
      <t-popover content="自定义位置" :custom="{ x: 80, y: 100 }">
        <t-button type="success" prefixIcon="position">自定义位置</t-button>
      </t-popover>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-popover
        content="测试事件"
        type="click"
        @hover-enter="handleHoverEnter"
        @hover-out="handleHoverOut"
        @model-change="handleModelChange"
      >
        <t-button type="primary" prefixIcon="link">事件测试</t-button>
      </t-popover>
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
import { TPopover } from "@/packages/popover";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "PopoverTest" });

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
const handleHoverEnter = (_: HTMLElement) => {
  addLog("鼠标进入");
};

const handleHoverOut = (_: HTMLElement) => {
  addLog("鼠标离开");
};

const handleModelChange = () => {
  addLog("显示状态改变");
};
</script>

<style lang="scss" scoped>
.popover-wrapper {
  display: flex;
  gap: 12px;
}
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

  .position-group,
  .button-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  // 增加测试区域间距
  :deep(.test-section) {
    margin-bottom: 24px;
  }

  .custom-content {
    padding: 8px;
    text-align: center;

    h4 {
      margin: 0 0 8px;
      font-size: 16px;
    }

    p {
      margin: 0 0 12px;
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
