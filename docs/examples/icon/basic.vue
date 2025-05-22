<template>
  <div class="icon-demo">
    <div class="icon-grid">
      <div v-for="iconName in commonIcons" :key="iconName" class="icon-item">
        <t-icon :icon="iconName" />
        <div class="icon-name">{{ iconName }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>


// 常用图标列表
const commonIcons = [
  "search",
  "home",
  "setting",
  "user",
  "message",
  "document",
  "calendar",
  "cloud",
  "image",
  "lock",
  "delete-to",
  "upload",
  "download",
  "edit",
  "info",
  "success-to",
  "warning-to",
  "error-to",
  "close"
];
</script>

<style scoped>
.icon-demo {
  padding: 16px 0;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 16px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  border-radius: 6px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-item:hover {
  background-color: #f6f6f6;
  transform: translateY(-2px);
}

.icon-name {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  text-align: center;
}
</style>
