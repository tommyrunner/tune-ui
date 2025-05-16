<template>
  <div class="carousel-demo">
    <t-carousel-group>
      <t-carousel v-for="item in 4" :key="item">
        <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
      </t-carousel>
    </t-carousel-group>
  </div>
</template>

<script setup>
import { TCarousel, TCarouselGroup } from "tune-ui";

// 测试数据
const colors = ["#67C23A", "#E6A23C", "#F56C6C", "#909399"];
</script>

<style scoped>
.carousel-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.carousel-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
</style>
