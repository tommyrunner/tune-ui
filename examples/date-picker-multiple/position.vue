<template>
  <div class="date-picker-demo">
    <!-- 顶部弹出 -->
    <div class="demo-item">
      <h4>顶部弹出 (top)</h4>
      <t-date-picker-multiple v-model="topPositionDates" position="top" :is-range="true" />
    </div>

    <!-- 底部弹出 -->
    <div class="demo-item">
      <h4>底部弹出 (bottom)</h4>
      <t-date-picker-multiple v-model="bottomPositionDates" position="bottom" :is-range="true" />
    </div>

    <!-- 左侧弹出 -->
    <div class="demo-item">
      <h4>左侧弹出 (left)</h4>
      <t-date-picker-multiple v-model="leftPositionDates" position="left" :is-range="true" />
    </div>

    <!-- 右侧弹出 -->
    <div class="demo-item">
      <h4>右侧弹出 (right)</h4>
      <t-date-picker-multiple v-model="rightPositionDates" position="right" :is-range="true" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


// 状态数据
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
