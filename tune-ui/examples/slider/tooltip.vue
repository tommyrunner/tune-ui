<template>
  <div class="demo-slider">
    <div class="slider-item">
      <p class="slider-label">默认提示</p>
      <t-slider v-model="value" show-tooltip />
    </div>

    <div class="slider-item">
      <p class="slider-label">隐藏提示</p>
      <t-slider v-model="value" :show-tooltip="false" />
    </div>

    <div class="slider-item">
      <p class="slider-label">自定义提示格式</p>
      <t-slider v-model="value" :format-tooltip="val => `${val}%`" />
    </div>

    <div class="slider-item">
      <p class="slider-label">不同提示位置</p>
      <div class="placement-row">
        <span class="placement-label">上方:</span>
        <t-slider v-model="value" placement="top" />
      </div>
      <div class="placement-row">
        <span class="placement-label">右侧:</span>
        <t-slider v-model="value" placement="right" />
      </div>
      <div class="placement-row">
        <span class="placement-label">下方:</span>
        <t-slider v-model="value" placement="bottom" />
      </div>
      <div class="placement-row">
        <span class="placement-label">左侧:</span>
        <t-slider v-model="value" placement="left" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const value = ref(60);
</script>

<style scoped>
.demo-slider {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.slider-item {
  margin-bottom: 16px;
}

.slider-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 12px;
}

.placement-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.placement-label {
  width: 60px;
  font-size: 14px;
  color: #6b7280;
}
</style>
