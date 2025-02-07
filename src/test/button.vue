<template>
  <div class="test-container">
    <h2>Button 按钮组件</h2>

    <!-- 基础类型按钮 -->
    <test-section title="基础类型按钮">
      <t-button>默认按钮</t-button>
      <t-button type="primary">主要按钮</t-button>
      <t-button type="success">成功按钮</t-button>
      <t-button type="info">信息按钮</t-button>
      <t-button type="warning">警告按钮</t-button>
      <t-button type="danger">危险按钮</t-button>
      <t-button type="text">文本按钮</t-button>
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <t-button disabled>禁用按钮</t-button>
      <t-button type="primary" disabled>禁用按钮</t-button>
    </test-section>

    <!-- 图标按钮 -->
    <test-section title="图标按钮">
      <t-button prefixIcon="search">前缀图标</t-button>
      <t-button suffixIcon="left-arrow">后缀图标</t-button>
      <t-button prefixIcon="edit" suffixIcon="delete">双图标</t-button>
    </test-section>

    <!-- 加载状态 -->
    <test-section title="加载状态">
      <t-button loading>加载中</t-button>
      <t-button type="primary" loading>加载中</t-button>
    </test-section>

    <!-- 按钮尺寸 -->
    <test-section title="按钮尺寸">
      <t-button size="small">小型按钮</t-button>
      <t-button size="default">默认按钮</t-button>
      <t-button size="large">大型按钮</t-button>
    </test-section>

    <!-- 按钮圆角 -->
    <test-section title="按钮圆角">
      <t-button radius="default">默认圆角</t-button>
      <t-button radius="round">圆润按钮</t-button>
      <t-button radius="circle" prefixIcon="search"></t-button>
    </test-section>

    <!-- 自定义颜色 -->
    <test-section title="自定义颜色">
      <t-button color="#8a2be2">自定义颜色</t-button>
      <t-button color="#ff69b4">自定义颜色</t-button>
    </test-section>

    <!-- 缩放效果 -->
    <test-section title="缩放效果">
      <t-button scale>默认缩放</t-button>
      <t-button :scale="false">禁用缩放</t-button>
    </test-section>

    <!-- 点击事件测试 -->
    <test-section title="点击事件">
      <t-button @click="handleClick">点击事件</t-button>
      <t-button @click="handleAsyncClick" :loading="loading">异步操作</t-button>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TButton } from "@/packages/button";
import TestSection from "./components/test-section.vue";

defineOptions({ name: "ButtonTest" });

const loading = ref(false);

/**
 * 处理按钮点击事件
 */
const handleClick = (event: MouseEvent) => {
  console.log("按钮被点击:", event);
};

/**
 * 处理异步点击事件
 */
const handleAsyncClick = async () => {
  loading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("异步操作完成");
  } finally {
    loading.value = false;
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
}
</style>
