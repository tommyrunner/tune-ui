<template>
  <div class="card-demo">
    <div class="card-row">
      <t-card shadow="always" title="总是显示阴影">
        <div class="card-content">
          <p>shadow="always"</p>
          <p>这个卡片总是显示阴影效果</p>
        </div>
      </t-card>

      <t-card shadow="hover" title="悬浮显示阴影">
        <div class="card-content">
          <p>shadow="hover"</p>
          <p>这个卡片在鼠标悬浮时显示阴影</p>
        </div>
      </t-card>

      <t-card shadow="never" title="从不显示阴影">
        <div class="card-content">
          <p>shadow="never"</p>
          <p>这个卡片从不显示阴影</p>
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

@media screen and (max-width: 992px) {
  .card-row {
    flex-direction: column;
  }
}
</style>
