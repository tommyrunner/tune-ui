<template>
  <div class="date-picker-demo">
    <!-- 范围选择模式 -->
    <div class="demo-item">
      <h4>范围选择模式</h4>
      <t-date-picker-multiple v-model="dateRange" :is-range="true" />
      <div class="value-display">选择的日期范围：{{ formatDisplayDates(dateRange) }}</div>
    </div>

    <!-- 多选模式 -->
    <div class="demo-item">
      <h4>多选模式</h4>
      <t-date-picker-multiple v-model="multipleDates" :is-range="false" placeholder="请选择多个日期" />
      <div class="value-display">选择的多个日期：{{ formatDisplayDates(multipleDates) }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import dayjs from "dayjs";

// 范围选择默认值：当前日期和7天后
const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

// 多选模式默认值：当前日期、3天后和7天后
const threeDaysLater = new Date(today);
const sevenDaysLater = new Date(today);
threeDaysLater.setDate(today.getDate() + 3);
sevenDaysLater.setDate(today.getDate() + 7);

// 组件状态
const dateRange = ref([today, nextWeek]);
const multipleDates = ref([today, threeDaysLater, sevenDaysLater]);

/**
 * 格式化显示日期
 */
const formatDisplayDates = dates => {
  if (!dates || dates.length === 0) return "未选择";
  return dates
    .map(date => {
      if (typeof date === "string") return date;
      if (date instanceof Date) return dayjs(date).format("YYYY-MM-DD");
      return date;
    })
    .join(", ");
};
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

.value-display {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
}
</style>
