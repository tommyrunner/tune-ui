<template>
  <div class="demo-slider">
    <div class="slider-item">
      <p class="slider-label">滑块与数字输入框结合</p>
      <div class="slider-input-container">
        <t-slider v-model="value" class="slider-with-input" />
        <t-input-number v-model="value" :min-value="0" :max-value="100" :step="1" />
      </div>
    </div>

    <div class="slider-item">
      <p class="slider-label">范围滑块与数字输入框结合</p>
      <div class="slider-input-container">
        <t-slider v-model="rangeValue" range class="slider-with-input" />
        <div class="input-number-range">
          <t-input-number v-model="rangeValue[0]" :min-value="0" :max-value="rangeValue[1]" :step="1" @input="updateRangeMin" />
          <span class="range-separator">-</span>
          <t-input-number v-model="rangeValue[1]" :min-value="rangeValue[0]" :max-value="100" :step="1" @input="updateRangeMax" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TSlider, TInputNumber } from "tune-ui";

const value = ref(50);
const rangeValue = ref([20, 80]);

const updateRangeMin = val => {
  // 确保最小值不大于最大值
  if (val > rangeValue.value[1]) {
    rangeValue.value = [val, val];
  } else {
    rangeValue.value = [val, rangeValue.value[1]];
  }
};

const updateRangeMax = val => {
  // 确保最大值不小于最小值
  if (val < rangeValue.value[0]) {
    rangeValue.value = [val, val];
  } else {
    rangeValue.value = [rangeValue.value[0], val];
  }
};
</script>

<style scoped>
.demo-slider {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.slider-item {
  margin-bottom: 16px;
}

.slider-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 12px;
}

.slider-input-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.slider-with-input {
  flex: 1;
  margin-right: 16px;
}

.input-number-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.range-separator {
  color: #6b7280;
}
</style>
