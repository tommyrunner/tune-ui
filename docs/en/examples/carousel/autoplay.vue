<template>
  <div class="carousel-demo">
    <div class="carousel-example">
      <h4>Autoplay</h4>
      <t-carousel-group :autoplay="true" :delay="2000">
        <t-carousel v-for="item in 4" :key="item">
          <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
        </t-carousel>
      </t-carousel-group>
    </div>

    <div class="carousel-example">
      <h4>Reverse Play</h4>
      <t-carousel-group :autoplay="true" :autoplayBack="true">
        <t-carousel v-for="item in 4" :key="item">
          <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
        </t-carousel>
      </t-carousel-group>
    </div>

    <div class="carousel-example">
      <h4>Pause on Hover</h4>
      <t-carousel-group :autoplay="true" :pauseOnHover="false">
        <t-carousel v-for="item in 4" :key="item">
          <div class="carousel-item" :style="{ backgroundColor: colors[item - 1] }">{{ item }}</div>
        </t-carousel>
      </t-carousel-group>
    </div>
  </div>
</template>

<script setup>
// Test data
const colors = ["#67C23A", "#E6A23C", "#F56C6C", "#909399"];
</script>

<style scoped>
.carousel-demo {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.carousel-example {
  margin-bottom: 8px;
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
