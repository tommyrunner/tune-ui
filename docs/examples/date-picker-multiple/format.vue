<template>
  <div class="date-picker-demo">
    <!-- 值格式化 -->
    <div class="demo-item">
      <h4>值格式化 (valueFormat: YYYY/MM/DD)</h4>
      <t-date-picker-multiple v-model="formattedValueDates" value-format="YYYY/MM/DD" :is-range="true" />
      <div class="value-display">
        <div>格式化后的值：{{ formattedValueDates }}</div>
        <div class="type-info">
          类型：{{ typeof formattedValueDates[0] === "undefined" ? "-" : typeof formattedValueDates[0] }}
        </div>
      </div>
    </div>

    <!-- 显示格式化 -->
    <div class="demo-item">
      <h4>显示格式化 (format: YYYY年MM月DD日)</h4>
      <t-date-picker-multiple v-model="formattedDisplayDates" format="YYYY年MM月DD日" :is-range="true" />
      <div class="value-display">
        <div>选择的日期：{{ formatDisplayDates(formattedDisplayDates) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TDatePickerMultiple } from "tune-ui";
import dayjs from "dayjs";

// 状态数据
const formattedValueDates = ref([]);
const formattedDisplayDates = ref([]);

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

.type-info {
  margin-top: 4px;
  font-size: 13px;
  color: #606266;
}
</style>
