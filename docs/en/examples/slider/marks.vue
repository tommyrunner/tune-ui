<template>
  <div class="demo-slider">
    <div class="slider-item">
      <p class="slider-label">Slider with Marks</p>
      <t-slider v-model="value" :marks="marks" />
      <div class="value-display">Current value: {{ value }}</div>
    </div>

    <div class="slider-item">
      <p class="slider-label">Range Slider with Marks</p>
      <t-slider v-model="rangeValue" :marks="marks" range />
      <div class="value-display">Current value: {{ rangeValue }}</div>
    </div>

    <div class="slider-item">
      <p class="slider-label">Custom Styled Marks</p>
      <t-slider v-model="customValue" :marks="customMarks" />
      <div class="value-display">Current value: {{ customValue }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref(30);
const rangeValue = ref([20, 60]);
const customValue = ref(50);

// Basic marks
const marks = {
  0: "0°C",
  25: "25°C",
  50: "50°C",
  75: "75°C",
  100: "100°C"
};

// Custom styled marks
const customMarks = {
  0: "0°C",
  25: {
    label: "25°C",
    style: {
      color: "#52c41a",
      fontWeight: "bold"
    }
  },
  50: {
    label: "50°C",
    style: {
      color: "#faad14",
      fontWeight: "bold"
    }
  },
  75: {
    label: "75°C",
    style: {
      color: "#ff4d4f",
      fontWeight: "bold"
    }
  },
  100: {
    label: "100°C",
    style: {
      color: "#ff4d4f",
      fontWeight: "bold",
      fontSize: "14px"
    }
  }
};
</script>

<style scoped>
.demo-slider {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.slider-item {
  margin-bottom: 16px;
}

.slider-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 12px;
}

.value-display {
  margin-top: 28px;
  padding: 6px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}
</style>
