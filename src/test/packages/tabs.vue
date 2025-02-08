<template>
  <div class="test-container">
    <h2>Tabs 标签页组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-tabs-group v-model="activeTab1">
        <t-tabs value="1">标签1</t-tabs>
        <t-tabs value="2">标签2</t-tabs>
        <t-tabs value="3">标签3</t-tabs>
        <t-tabs value="4" disabled>禁用标签</t-tabs>
      </t-tabs-group>
    </test-section>

    <!-- 不同类型 -->
    <test-section title="不同类型">
      <div class="tabs-group">
        <h4>线条类型</h4>
        <t-tabs-group v-model="activeTab2" type="line">
          <t-tabs value="1">标签1</t-tabs>
          <t-tabs value="2">标签2</t-tabs>
          <t-tabs value="3">标签3</t-tabs>
        </t-tabs-group>
      </div>

      <div class="tabs-group">
        <h4>边框类型</h4>
        <t-tabs-group v-model="activeTab3" type="border">
          <t-tabs value="1">标签1</t-tabs>
          <t-tabs value="2">标签2</t-tabs>
          <t-tabs value="3">标签3</t-tabs>
        </t-tabs-group>
      </div>

      <div class="tabs-group">
        <h4>块状类型</h4>
        <t-tabs-group v-model="activeTab4" type="block">
          <t-tabs value="1">标签1</t-tabs>
          <t-tabs value="2">标签2</t-tabs>
          <t-tabs value="3">标签3</t-tabs>
        </t-tabs-group>
      </div>
    </test-section>

    <!-- 自定义高度 -->
    <test-section title="自定义高度">
      <t-tabs-group v-model="activeTab5" height="50px">
        <t-tabs value="1">标签1</t-tabs>
        <t-tabs value="2">标签2</t-tabs>
        <t-tabs value="3">标签3</t-tabs>
      </t-tabs-group>
    </test-section>

    <!-- 自定义间距 -->
    <test-section title="自定义间距">
      <div class="tabs-group">
        <h4>无间距(充满)</h4>
        <t-tabs-group v-model="activeTab6" :gap="0">
          <t-tabs value="1">标签1</t-tabs>
          <t-tabs value="2">标签2</t-tabs>
          <t-tabs value="3">标签3</t-tabs>
        </t-tabs-group>
      </div>

      <div class="tabs-group">
        <h4>大间距</h4>
        <t-tabs-group v-model="activeTab7" :gap="20">
          <t-tabs value="1">标签1</t-tabs>
          <t-tabs value="2">标签2</t-tabs>
          <t-tabs value="3">标签3</t-tabs>
        </t-tabs-group>
      </div>
    </test-section>

    <!-- 带图标 -->
    <test-section title="带图标">
      <t-tabs-group v-model="activeTab8">
        <t-tabs value="1" icon="home">首页</t-tabs>
        <t-tabs value="2" icon="user">用户</t-tabs>
        <t-tabs value="3" icon="scan">设置</t-tabs>
      </t-tabs-group>
    </test-section>

    <!-- 可关闭 -->
    <test-section title="可关闭">
      <div class="tabs-actions">
        <t-button type="primary" size="small" @click="handleAdd">添加标签</t-button>
      </div>
      <t-tabs-group v-model="activeTab9" :is-close="true" @close="handleClose">
        <t-tabs v-for="tab in tabs" :key="tab.value" :value="tab.value">
          {{ tab.label }}
        </t-tabs>
      </t-tabs-group>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-tabs-group v-model="activeTab10" @change="handleChange">
        <t-tabs value="1">标签1</t-tabs>
        <t-tabs value="2">标签2</t-tabs>
        <t-tabs value="3">标签3</t-tabs>
      </t-tabs-group>
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
import { TTabs, TTabsGroup } from "@/packages/tabs";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "TabsTest" });

// 基础用法
const activeTab1 = ref("1");

// 不同类型
const activeTab2 = ref("1");
const activeTab3 = ref("1");
const activeTab4 = ref("1");

// 自定义高度
const activeTab5 = ref("1");

// 自定义间距
const activeTab6 = ref("1");
const activeTab7 = ref("1");

// 带图标
const activeTab8 = ref("1");

// 可关闭标签数据
const tabs = ref([
  { value: "1", label: "标签1" },
  { value: "2", label: "标签2" },
  { value: "3", label: "标签3" }
]);

// 可关闭标签当前值
const activeTab9 = ref("1");

// 事件测试
const activeTab10 = ref("1");

// 事件日志
const logs = ref<string[]>([]);

// 标签计数器
let tabCounter = 3;

// 添加日志
const addLog = (message: string) => {
  logs.value.unshift(message);
  if (logs.value.length > 5) {
    logs.value.pop();
  }
};

// 事件处理
const handleChange = (value: string | number) => {
  addLog(`标签切换: ${value}`);
};

// 处理添加标签
const handleAdd = () => {
  tabCounter++;
  const newTab = {
    value: String(tabCounter),
    label: `标签${tabCounter}`
  };
  tabs.value.push(newTab);
  // 自动选中新添加的标签
  activeTab9.value = newTab.value;
  addLog(`添加标签: ${newTab.label}`);
};

// 处理关闭事件
const handleClose = (value: string | number) => {
  // 记录日志
  addLog(`标签关闭: ${value}`);

  // 删除对应标签
  const index = tabs.value.findIndex(tab => tab.value === value);
  if (index > -1) {
    // 如果关闭的是当前选中的标签，先切换选中项
    if (value === activeTab9.value) {
      // 优先选择后一个标签，如果没有则选择前一个
      const newIndex = index < tabs.value.length - 1 ? index : index - 1;
      activeTab9.value = tabs.value[newIndex]?.value || "";
    }
    // 删除标签
    tabs.value.splice(index, 1);
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

  .tabs-group {
    margin-bottom: 24px;

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

  .tabs-actions {
    margin-bottom: 16px;
  }
}
</style>
