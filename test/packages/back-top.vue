<template>
  <div class="test-container">
    <h2>BackTop 回到顶部组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-back-top :visible-height="200" target=".scroll-content-basic" />
      <t-back-top :visible-height="200" right="100px" plain target=".scroll-content-basic" />
      <div class="scroll-content scroll-content-basic">
        <p v-for="i in 40" :key="i">这是第 {{ i }} 行内容</p>
      </div>
    </test-section>

    <!-- 位置和尺寸 -->
    <test-section title="位置和尺寸">
      <t-back-top right="100px" bottom="100px" :size="50" :radius="8" target=".scroll-content-position" />
      <div class="scroll-content scroll-content-position">
        <p>配置说明：</p>
        <ul>
          <li>right: 100px - 距离右侧100px</li>
          <li>bottom: 100px - 距离底部100px</li>
          <li>size: 50 - 按钮尺寸50px</li>
          <li>radius: 8 - 圆角大小8px</li>
        </ul>
        <p v-for="i in 40" :key="i">这是第 {{ i }} 行内容</p>
      </div>
    </test-section>

    <!-- 图标配置 -->
    <test-section title="图标配置">
      <t-back-top icon="afferent" :icon-size="24" background="#1f2937" color="#ffffff" target=".scroll-content-icon" />
      <div class="scroll-content scroll-content-icon">
        <p>配置说明：</p>
        <ul>
          <li>icon: arrow-up - 使用向上箭头图标</li>
          <li>icon-size: 24 - 图标大小24px</li>
          <li>background: #1f2937 - 背景颜色</li>
          <li>color: #ffffff - 图标颜色</li>
        </ul>
        <p v-for="i in 40" :key="i">这是第 {{ i }} 行内容</p>
      </div>
    </test-section>

    <!-- 滚动配置 -->
    <test-section title="滚动配置">
      <t-back-top
        :visible-height="300"
        :duration="800"
        :throttle-delay="500"
        @click="handleClick"
        target=".scroll-content-config"
      />
      <div class="scroll-content scroll-content-config">
        <p>配置说明：</p>
        <ul>
          <li>visible-height: 300 - 滚动超过300px显示</li>
          <li>duration: 800 - 回到顶部动画持续800ms</li>
          <li>throttle-delay: 500 - 节流延迟500ms</li>
        </ul>
        <p v-for="i in 40" :key="i">这是第 {{ i }} 行内容</p>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TBackTop } from "@/packages/back-top";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "BackTopTest" });

// 事件日志
const logs = ref<string[]>([]);

// 点击事件
const handleClick = () => {
  logs.value.push(`触发 click 事件: ${new Date().toLocaleTimeString()}`);
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

  .scroll-content {
    height: 300px;
    padding: 20px;
    overflow: auto;
    background-color: #f9fafb;
    border-radius: 4px;

    p {
      margin: 8px 0;
      color: #666;
    }

    ul {
      margin: 12px 0;
      padding-left: 20px;
      color: #666;

      li {
        margin: 8px 0;
      }
    }
  }

  .custom-container {
    position: relative;
    height: 300px;
    padding: 20px;
    overflow: auto;
    background-color: #f9fafb;
    border-radius: 4px;

    p {
      margin: 8px 0;
      color: #666;
    }

    ul {
      margin: 12px 0;
      padding-left: 20px;
      color: #666;

      li {
        margin: 8px 0;
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
