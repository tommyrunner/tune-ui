<template>
  <div class="card-demo">
    <div class="card-row">
      <t-card title="标题文本">
        <div class="card-content">
          <p>这是一个带有文本标题的卡片</p>
          <p>通过title属性设置卡片标题</p>
        </div>
      </t-card>

      <t-card title="带图标的标题" titleIcon="info">
        <div class="card-content">
          <p>这是一个带有图标和标题的卡片</p>
          <p>通过titleIcon属性添加标题图标</p>
        </div>
      </t-card>
    </div>
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

.card-row {
  display: flex;
  gap: 20px;
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

@media screen and (max-width: 768px) {
  .card-row {
    flex-direction: column;
  }
}
</style>
