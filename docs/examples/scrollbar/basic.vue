<template>
  <div class="example-container">
    <t-scrollbar>
      <div class="scrollbar-content">
        <p v-for="item in 20" :key="item" class="scrollbar-item">
          {{ item }}. 滚动内容示例 - 这是一段示例文本，用于展示滚动条的基础用法。
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
