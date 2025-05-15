<template>
  <div class="example-container">
    <t-scrollbar :permanent="true">
      <div class="scrollbar-content">
        <p v-for="item in 20" :key="item" class="scrollbar-item">
          {{ item }}. 常驻滚动条示例 - 设置permanent属性为true可以让滚动条常驻显示。
        </p>
      </div>
    </t-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { TScrollbar } from "tune-ui";
</script>

<style scoped>
.example-container {
  width: 100%;
}

.scrollbar-content {
  padding: 10px;
}

.scrollbar-item {
  padding: 10px;
  margin-bottom: 10px;
  background: #f6f8fa;
  border-radius: 4px;
}
</style>
