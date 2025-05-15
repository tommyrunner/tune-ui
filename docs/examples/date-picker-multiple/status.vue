<template>
  <div class="date-picker-demo">
    <!-- 禁用状态 -->
    <div class="demo-item">
      <h4>禁用状态 (disabled)</h4>
      <t-date-picker-multiple v-model="disabledDates" disabled :is-range="true" />
      <div class="value-display">
        <div>选择的日期：{{ formatDisplayDates(disabledDates) }}</div>
      </div>
    </div>

    <!-- 禁用日期 -->
    <div class="demo-item">
      <h4>禁用日期 (disabledDate)</h4>
      <t-date-picker-multiple
        v-model="disabledBeforeTodayDates"
        :disabled-date="disableDateBeforeToday"
        :is-range="true"
        placeholder="不能选择今天之前的日期"
      />
      <div class="value-display">
        <div>选择的日期：{{ formatDisplayDates(disabledBeforeTodayDates) }}</div>
        <div class="disabled-info">今天之前的日期已被禁用</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TDatePickerMultiple } from "tune-ui";
import dayjs from "dayjs";

// 状态数据
const disabledDates = ref([new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]);
const disabledBeforeTodayDates = ref([]);

/**
 * 禁用今天之前的日期
 * @param date 日期对象
 * @returns 是否禁用
 */
const disableDateBeforeToday = date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

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

.disabled-info {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #e0e0e0;
  font-size: 13px;
  color: #606266;
}
</style>
