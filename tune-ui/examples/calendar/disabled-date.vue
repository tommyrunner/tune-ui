<template>
  <div class="example-container">
    <div class="disabled-item">
      <h4>禁用今天之前的日期</h4>
      <t-calendar v-model="disabledBeforeTodayDate" :disabled-date="disableDateBeforeToday" />
    </div>
    
    <div class="disabled-item">
      <h4>禁用周末</h4>
      <t-calendar v-model="disabledWeekendDate" :disabled-date="disableWeekend" />
    </div>
    
    <div class="value-display">
      <p>禁用今天之前: {{ formatDate(disabledBeforeTodayDate) }}</p>
      <p>禁用周末: {{ formatDate(disabledWeekendDate) }}</p>
      <div class="disabled-info">
        <div>禁用规则说明：</div>
        <div>- 第一个日历中，今天之前的日期已被禁用</div>
        <div>- 第二个日历中，周末（周六和周日）已被禁用</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";


const disabledBeforeTodayDate = ref(new Date());
const disabledWeekendDate = ref(new Date());

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
 * 禁用周末
 * @param date 日期对象
 * @returns 是否禁用
 */
const disableWeekend = date => {
  const day = date.getDay();
  return day === 0 || day === 6; // 周六周日
};

/**
 * 格式化日期
 * @param date 日期对象
 * @returns 格式化后的日期字符串
 */
const formatDate = date => {
  if (!date) return "未选择";
  if (typeof date === "string") return date;
  if (typeof date === "number") return new Date(date).toLocaleString();
  return date.toLocaleString();
};
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.disabled-item {
  margin-bottom: 20px;
}

.disabled-item h4 {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
}

.value-display {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
}

.disabled-info {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px dashed #e0e0e0;
  font-size: 12px;
  color: #909399;
}
</style> 