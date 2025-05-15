<template>
  <div class="card-demo">
    <t-card>
      <div class="card-content">
        <p>这是一个基础卡片示例</p>
        <p>卡片可以包含各种内容，如文本、图片、列表等</p>
      </div>
    </t-card>
  </div>
</template>

<script setup>
import { TCard } from "tune-ui";
</script>

<style scoped>
.card-demo {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 6px;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-content p {
  margin: 0;
  line-height: 1.6;
  color: #606266;
}
</style>
