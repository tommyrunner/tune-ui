<template>
  <div class="loading-example">
    <div class="loading-card">
      <div class="loading-content">
        <h3>全屏加载</h3>
        <p>通过fullLoading API可以显示覆盖整个屏幕的加载效果</p>
      </div>
    </div>
    <div class="loading-actions">
      <t-button @click="showFullscreenLoading" type="primary">显示全屏加载</t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TButton } from "tune-ui";
// 注意：在实际应用中，请从tune-ui导入
// 这里仅用于演示，实际加载组件需要按照项目真实路径导入
import { fullLoading, MODEL_TYPES } from "web-loading";

const showFullscreenLoading = () => {
  const loading = fullLoading({
    text: "全屏加载中，2秒后自动关闭...",
    bgColor: "rgba(0, 0, 0, 0.5)",
    delay: 200,
    model: MODEL_TYPES.RING
  });

  loading.loading(document.body);

  setTimeout(() => {
    loading.close();
  }, 2000);
};
</script>

<style scoped>
.loading-example {
  width: 100%;
}

.loading-card {
  width: 100%;
  height: 200px;
  background-color: #f9fafb;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-content {
  text-align: center;
  padding: 20px;
}

.loading-content h3 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
}

.loading-content p {
  color: #4b5563;
  font-size: 14px;
}

.loading-actions {
  display: flex;
  justify-content: center;
}
</style>
