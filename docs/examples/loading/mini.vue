<template>
  <div class="loading-example">
    <div class="loading-card">
      <div class="loading-content">
        <h3>迷你加载</h3>
        <p>通过miniLoading API可以显示更加轻量的加载效果</p>
      </div>
    </div>
    <div class="loading-actions">
      <t-button @click="showMiniLoading" type="primary">显示迷你加载</t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TButton } from "tune-ui";
// 注意：在实际应用中，请从tune-ui导入
// 这里仅用于演示，实际加载组件需要按照项目真实路径导入
import { miniLoading, MODEL_TYPES } from "web-loading";

const showMiniLoading = () => {
  const loading = miniLoading({
    text: "迷你加载中...",
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
