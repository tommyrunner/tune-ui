<template>
  <div class="carousel-demo">
    <div class="carousel-row">
      <div class="carousel-example">
        <h4>点击触发指示器</h4>
        <t-carousel-group trigger="click">
          <t-carousel v-for="item in 4" :key="item">
            <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
          </t-carousel>
        </t-carousel-group>
      </div>

      <div class="carousel-example">
        <h4>不显示指示器</h4>
        <t-carousel-group trigger="none">
          <t-carousel v-for="item in 4" :key="item">
            <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
          </t-carousel>
        </t-carousel-group>
      </div>
    </div>

    <div class="carousel-row">
      <div class="carousel-example">
        <h4>总是显示箭头</h4>
        <t-carousel-group arrow="always">
          <t-carousel v-for="item in 4" :key="item">
            <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
          </t-carousel>
        </t-carousel-group>
      </div>

      <div class="carousel-example">
        <h4>不显示箭头</h4>
        <t-carousel-group arrow="none">
          <t-carousel v-for="item in 4" :key="item">
            <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
          </t-carousel>
        </t-carousel-group>
      </div>
    </div>
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
  gap: 32px;
}

.carousel-row {
  display: flex;
  gap: 24px;
}

.carousel-example {
  flex: 1;
}

.carousel-example h4 {
  margin-bottom: 12px;
  font-weight: 500;
  color: #334155;
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
