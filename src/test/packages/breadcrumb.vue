<template>
  <div class="test-container">
    <h2>Breadcrumb 面包屑组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-breadcrumb :options="baseOptions" v-model="activeValue" />
    </test-section>

    <!-- 带图标 -->
    <test-section title="带图标">
      <t-breadcrumb :options="iconOptions" v-model="activeValue" />
    </test-section>

    <!-- 自定义分隔符 -->
    <test-section title="自定义分隔符">
      <div class="breadcrumb-group">
        <div class="breadcrumb-item">
          <div class="breadcrumb-label">默认分隔符：</div>
          <t-breadcrumb :options="baseOptions" v-model="activeValue" />
        </div>
        <div class="breadcrumb-item">
          <div class="breadcrumb-label">图标分隔符：</div>
          <t-breadcrumb :options="baseOptions" v-model="activeValue" separatedIcon="right" />
        </div>
      </div>
    </test-section>

    <!-- 间距设置 -->
    <test-section title="间距设置">
      <div class="breadcrumb-group">
        <div class="breadcrumb-item">
          <div class="breadcrumb-label">默认间距(6px)：</div>
          <t-breadcrumb :options="baseOptions" v-model="activeValue" />
        </div>
        <div class="breadcrumb-item">
          <div class="breadcrumb-label">大间距(12px)：</div>
          <t-breadcrumb :options="baseOptions" v-model="activeValue" :gap="12" />
        </div>
      </div>
    </test-section>

    <!-- 路由跳转 -->
    <test-section title="路由跳转">
      <div class="breadcrumb-group">
        <div class="breadcrumb-item">
          <div class="breadcrumb-label">普通模式：</div>
          <t-breadcrumb :options="routerOptions" v-model="activeValue" :isRouter="false" />
        </div>
        <div class="breadcrumb-item">
          <div class="breadcrumb-label">路由模式：</div>
          <t-breadcrumb :options="routerOptions" v-model="activeValue" :isRouter="true" />
        </div>
        <div class="breadcrumb-item">
          <div class="breadcrumb-label">Replace模式：</div>
          <t-breadcrumb :options="routerOptions" v-model="activeValue" isRouter isReplace />
        </div>
      </div>
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <t-breadcrumb :options="disabledOptions" v-model="activeValue" />
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-breadcrumb :options="baseOptions" v-model="activeValue" @change="handleChange" />
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
import { ref, defineComponent } from "vue";
import type { RouteRecordRaw } from "vue-router";
import type { ValueType } from "@/packages/breadcrumb/breadcrumb";
import { TBreadcrumb } from "@/packages/breadcrumb";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "BreadcrumbTest" });

// 基础数据
const baseOptions: ValueType[] = [
  { label: "首页", value: "home" },
  { label: "列表", value: "list" },
  { label: "详情", value: "detail" }
];

// 图标数据
const iconOptions: ValueType[] = [
  { label: "首页", value: "home", icon: "home" },
  { label: "列表", value: "list", icon: "menu" },
  { label: "详情", value: "detail", icon: "information" }
];

// 禁用数据
const disabledOptions: ValueType[] = [
  { label: "首页", value: "home" },
  { label: "列表", value: "list", disabled: true },
  { label: "详情", value: "detail" }
];

// 创建测试组件
const TestView = defineComponent({
  name: "TestView",
  template: "<div>测试页面</div>"
});

// 路由配置
const routeConfig: RouteRecordRaw[] = [
  { path: "/", name: "home", component: TestView },
  { path: "/list", name: "list", component: TestView },
  { path: "/detail", name: "detail", component: TestView }
];

// 路由数据
const routerOptions: ValueType[] = [
  { label: "首页", value: "home", to: routeConfig[0] },
  { label: "列表", value: "list", to: routeConfig[1] },
  { label: "详情", value: "detail", to: routeConfig[2] }
];

// 当前选中值
const activeValue = ref("list");

// 事件记录
const eventLogs = ref<string[]>([]);

/**
 * 处理选择事件
 */
const handleChange = (item: ValueType) => {
  eventLogs.value.unshift(`点击项: ${item.label}`);
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

  .breadcrumb-group {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .breadcrumb-item {
      display: flex;
      align-items: center;
      gap: 12px;

      .breadcrumb-label {
        min-width: 120px;
        color: #666;
      }
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
