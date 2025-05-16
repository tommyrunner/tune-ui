<template>
  <div class="date-picker-demo">
    <!-- 小尺寸 -->
    <div class="demo-item">
      <h4>小尺寸 (small)</h4>
      <t-date-picker-multiple v-model="smallSizeDates" size="small" :is-range="true" />
    </div>

    <!-- 默认尺寸 -->
    <div class="demo-item">
      <h4>默认尺寸 (default)</h4>
      <t-date-picker-multiple v-model="defaultSizeDates" size="default" :is-range="true" />
    </div>

    <!-- 大尺寸 -->
    <div class="demo-item">
      <h4>大尺寸 (large)</h4>
      <t-date-picker-multiple v-model="largeSizeDates" size="large" :is-range="true" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TDatePickerMultiple } from "tune-ui";

// 状态数据
const smallSizeDates = ref([]);
const defaultSizeDates = ref([]);
const largeSizeDates = ref([]);
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
