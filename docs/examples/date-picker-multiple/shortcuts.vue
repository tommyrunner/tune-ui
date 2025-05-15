<template>
  <div class="date-picker-demo">
    <div class="demo-item">
      <h4>带快捷选项的日期范围选择</h4>
      <t-date-picker-multiple
        v-model="dateRangeWithShortcuts"
        :shortcuts="shortcuts"
        :is-range="true"
        placeholder="使用快捷选项选择日期范围"
      />
      <div class="value-display">
        <div>选择的日期范围：{{ formatDisplayDates(dateRangeWithShortcuts) }}</div>
        <div class="shortcuts-info">可用快捷选项：最近一周、最近一个月、最近三个月</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TDatePickerMultiple } from "tune-ui";
import dayjs from "dayjs";

// 状态数据
const dateRangeWithShortcuts = ref([]);

// 快捷选项定义
const shortcuts = [
  {
    label: "最近一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
  },
  {
    label: "最近一个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 1);
      return [start, end];
    }
  },
  {
    label: "最近三个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 3);
      return [start, end];
    }
  }
];

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

.shortcuts-info {
  margin-top: 6px;
  font-size: 13px;
  color: #606266;
}
</style>
