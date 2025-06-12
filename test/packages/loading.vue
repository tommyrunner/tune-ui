<template>
  <div class="test-container">
    <h2>Loading 加载组件</h2>
    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="loading-demo-grid">
        <div class="loading-demo-card" v-loading="loading1">
          <h3>默认加载</h3>
          <p>展示区域内显示加载动画</p>
        </div>

        <div class="loading-demo-card" v-loading="loading2">
          <h3>自定义文本</h3>
          <p>可以自定义加载文本</p>
        </div>

        <div class="loading-demo-card" v-loading="loading3">
          <h3>自定义背景</h3>
          <p>可以自定义加载遮罩背景</p>
        </div>
      </div>

      <div class="loading-action-buttons">
        <t-button @click="toggleLoading('loading1')" type="primary">{{ loading1 ? "隐藏" : "显示" }}默认加载</t-button>
        <t-button @click="toggleLoading('loading2')" type="success">{{ loading2 ? "隐藏" : "显示" }}带文本加载</t-button>
        <t-button @click="toggleLoading('loading3')" type="warning">{{ loading3 ? "隐藏" : "显示" }}深色背景加载</t-button>
      </div>
    </test-section>

    <!-- 全屏与迷你加载 -->
    <test-section title="全屏与迷你加载">
      <div class="loading-special-container">
        <div class="loading-special-card">
          <h3>全屏加载</h3>
          <p>覆盖整个页面的加载效果</p>
          <t-button @click="showFullscreenLoading" type="primary">显示全屏加载</t-button>
        </div>

        <div class="loading-special-card">
          <h3>迷你加载</h3>
          <p>轻量级的加载提示</p>
          <t-button @click="showMiniLoading" type="success">显示迷你加载</t-button>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";
import { fullLoading, miniLoading } from "@/packages/loading";
import { useOptions } from "@/hooks/useOptions";
import { OptionsType, MODEL_TYPES } from "@/directive";

defineOptions({ name: "LoadingTest" });
const { updateLoadingOptions } = useOptions();

// 加载状态
const loading1 = ref(false);
const loading2 = ref(false);
const loading3 = ref(false);
const loading4 = ref(false);
const loading5 = ref(false);

/**
 * 切换加载状态
 * @param {string} loadingRef - 要切换的加载状态引用名称
 */
const toggleLoading = (loadingRef: "loading1" | "loading2" | "loading3" | "loading4" | "loading5") => {
  if (loadingRef === "loading1") {
    // 默认加载
    updateLoadingOptions({
      text: "默认加载中...",
      model: MODEL_TYPES.RING
    });
    loading1.value = !loading1.value;
  } else if (loadingRef === "loading2") {
    // 自定义文本加载
    updateLoadingOptions({
      text: "自定义文本加载...",
      model: MODEL_TYPES.RING
    });
    loading2.value = !loading2.value;
  } else if (loadingRef === "loading3") {
    // 自定义背景加载
    updateLoadingOptions({
      text: "自定义背景加载",
      bgColor: "rgba(0, 0, 0, 0.5)",
      model: MODEL_TYPES.RING
    });
    loading3.value = !loading3.value;
  } else if (loadingRef === "loading4") {
    // Bounce动画加载
    updateLoadingOptions({
      text: "Bounce动画加载",
      model: MODEL_TYPES.BEAN
    });
    loading4.value = !loading4.value;
  } else if (loadingRef === "loading5") {
    // Spin动画加载
    updateLoadingOptions({
      text: "Spin动画加载",
      model: MODEL_TYPES.BEAN
    });
    loading5.value = !loading5.value;
  }
};

/**
 * 显示全屏加载
 */
const showFullscreenLoading = () => {
  const options: OptionsType = {
    text: "加载中...",
    bgColor: "rgba(0, 0, 0, 0.5)",
    model: MODEL_TYPES.RING,
    delay: 200
  };
  const loading = fullLoading(options);
  loading.loading(document.body);
  setTimeout(() => {
    loading.close();
  }, 2000);
};

/**
 * 显示迷你加载
 */
const showMiniLoading = () => {
  const options: OptionsType = {
    text: "加载中...",
    bgColor: "rgba(0, 0, 0, 0.5)",
    model: MODEL_TYPES.RING,
    delay: 200
  };
  const loading = miniLoading(options);
  loading.loading(document.body);
  setTimeout(() => {
    loading.close();
  }, 2000);
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
    margin-bottom: 32px;

    .test-section-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  // 网格布局的加载演示卡片
  .loading-demo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  // 加载类型容器
  .loading-types-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  // 特殊加载容器
  .loading-special-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  // 通用卡片样式
  .loading-demo-card,
  .loading-type-card,
  .loading-special-card {
    height: 200px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: #d1d5db;
    }

    h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
      color: #1f2937;
    }

    p {
      margin: 0;
      color: #6b7280;
      font-size: 14px;
    }
  }

  // 特殊卡片布局
  .loading-special-card {
    align-items: flex-start;

    t-button {
      margin-top: auto;
    }
  }

  // 操作按钮容器
  .loading-action-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  // 中心提示文本
  .center-placeholder {
    margin-top: 16px;
    color: #9ca3af;
    text-align: center;
    font-size: 14px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
