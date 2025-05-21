<template>
  <div class="date-picker-demo">
    <div class="demo-item">
      <h4>日期时间选择</h4>
      <t-date-picker-multiple v-model="dateTimeValues" :show-time="true" :is-range="true" format="YYYY-MM-DD HH:mm:ss" />
      <div class="value-display">
        <div>选择的日期时间：{{ formatDisplayDates(dateTimeValues, "YYYY-MM-DD HH:mm:ss") }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import dayjs from "dayjs";

// 状态数据
const dateTimeValues = ref([]);

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
