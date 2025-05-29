<template>
  <div class="loading-example">
    <div class="loading-card">
      <div class="loading-content">
        <h3>Fullscreen Loading</h3>
        <p>You can display a loading effect that covers the entire screen through the fullLoading API</p>
      </div>
    </div>
    <div class="loading-actions">
      <t-button @click="showFullscreenLoading" type="primary">Show Fullscreen Loading</t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const showFullscreenLoading = () => {
  const options = {
    text: "Loading...",
    bgColor: "rgba(0, 0, 0, 0.5)",
    delay: 200
  };
  const loading = fullLoading(options);
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
