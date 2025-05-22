<template>
  <div class="date-picker-demo">
    <!-- 日期模式 -->
    <div class="demo-item">
      <h4>日期模式 (date)</h4>
      <t-date-picker-multiple v-model="dateModeValues" mode="date" :is-range="true" />
      <div class="value-display">
        <span>所选日期：{{ formatDisplayDates(dateModeValues) }}</span>
      </div>
    </div>

    <!-- 月份模式 -->
    <div class="demo-item">
      <h4>月份模式 (month)</h4>
      <t-date-picker-multiple v-model="monthModeValues" mode="month" :is-range="true" />
      <div class="value-display">
        <span>所选月份：{{ formatDisplayDates(monthModeValues, "YYYY年MM月") }}</span>
      </div>
    </div>

    <!-- 年份模式 -->
    <div class="demo-item">
      <h4>年份模式 (year)</h4>
      <t-date-picker-multiple v-model="yearModeValues" mode="year" :is-range="true" />
      <div class="value-display">
        <span>所选年份：{{ formatDisplayDates(yearModeValues, "YYYY年") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import dayjs from "dayjs";

// 状态数据
const dateModeValues = ref([]);
const monthModeValues = ref([]);
const yearModeValues = ref([]);

/**
 * 格式化显示日期
 */
const formatDisplayDates = (dates, format = "YYYY-MM-DD") => {
  if (!dates || dates.length === 0) return "未选择";
  return dates
    .map(date => {
      if (typeof date === "string") return date;
      if (date instanceof Date) return dayjs(date).format(format);
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
