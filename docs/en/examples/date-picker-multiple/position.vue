<template>
  <div class="date-picker-demo">
    <!-- Top popup -->
    <div class="demo-item">
      <h4>Top Popup (top)</h4>
      <t-date-picker-multiple v-model="topPositionDates" position="top" :is-range="true" />
    </div>

    <!-- Bottom popup -->
    <div class="demo-item">
      <h4>Bottom Popup (bottom)</h4>
      <t-date-picker-multiple v-model="bottomPositionDates" position="bottom" :is-range="true" />
    </div>

    <!-- Left popup -->
    <div class="demo-item">
      <h4>Left Popup (left)</h4>
      <t-date-picker-multiple v-model="leftPositionDates" position="left" :is-range="true" />
    </div>

    <!-- Right popup -->
    <div class="demo-item">
      <h4>Right Popup (right)</h4>
      <t-date-picker-multiple v-model="rightPositionDates" position="right" :is-range="true" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// State data
const topPositionDates = ref([]);
const bottomPositionDates = ref([]);
const leftPositionDates = ref([]);
const rightPositionDates = ref([]);
</script>

<style scoped>
.date-picker-demo {
  padding: 16px 0;
}

.demo-item {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 500;
}
</style>
