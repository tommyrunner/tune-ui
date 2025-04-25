<template>
  <div class="test-container">
    <h2>Loading 加载组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="loading-container" v-loading="loading1">1{{ loading1 }}</div>
      <t-button @click="toggleLoading('loading1')" type="primary">{{ loading1 ? "隐藏加载" : "显示加载" }}</t-button>
    </test-section>

    <!-- 全屏加载 -->
    <test-section title="全屏加载">
      <t-button @click="showFullscreenLoading">显示全屏加载</t-button>
    </test-section>

    <!-- 迷你加载 -->
    <test-section title="迷你加载">
      <t-button @click="showMiniLoading">显示迷你加载</t-button>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";
import { fullLoading, miniLoading } from "@/packages/loading";

defineOptions({ name: "LoadingTest" });

const loading1 = ref(false);
const loading2 = ref(false);
const loading3 = ref(false);

/**
 * 切换加载状态
 * @param {string} loadingRef - 要切换的加载状态引用名称
 */
const toggleLoading = (loadingRef: "loading1" | "loading2" | "loading3") => {
  if (loadingRef === "loading1") {
    loading1.value = !loading1.value;
  } else if (loadingRef === "loading2") {
    loading2.value = !loading2.value;
  } else if (loadingRef === "loading3") {
    loading3.value = !loading3.value;
  }
};

/**
 * 显示全屏加载
 */
const showFullscreenLoading = () => {
  const loading = fullLoading({});
  loading.loading();
  setTimeout(() => {
    loading.close();
  }, 1500);
};

/**
 * 显示迷你加载
 */
const showMiniLoading = () => {
  const loading = miniLoading({});
  loading.loading();
  setTimeout(() => {
    loading.close();
  }, 1500);
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

  :deep(.test-section) {
    .test-section-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }

  .loading-container {
    width: 300px;
    height: 200px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
