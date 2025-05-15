<template>
  <div class="example-container">
    <t-calendar v-model="date">
      <template #date="{ date }">
        <div :class="['custom-date', isHoliday(date) && 'holiday-cell', isSelected(date) && 'selected-cell']">
          {{ date.getDate() }}
          <div v-if="isHoliday(date)" class="holiday-mark">休</div>
        </div>
      </template>
    </t-calendar>
    
    <div class="value-display">
      <p>当前选中日期: {{ formatDate(date) }}</p>
      <div class="legend">
        <div class="legend-item">
          <div class="legend-color holiday-color"></div>
          <span>周末/假日</span>
        </div>
        <div class="legend-item">
          <div class="legend-color selected-color"></div>
          <span>当前选中</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TCalendar } from "tune-ui";

const date = ref(new Date());

// 判断日期是否为假期
const isHoliday = date => {
  const day = date.getDay();
  return day === 0 || day === 6; // 周六周日
};

// 判断日期是否被选中
const isSelected = date => {
  if (!date) return false;
  const selectedDate = new Date(date);
  return (
    selectedDate.getFullYear() === date.getFullYear() &&
    selectedDate.getMonth() === date.getMonth() &&
    selectedDate.getDate() === date.getDate()
  );
};

// 格式化日期
const formatDate = date => {
  if (!date) return "未选择";
  if (typeof date === "string") return date;
  if (typeof date === "number") return new Date(date).toLocaleString();
  return date.toLocaleString();
};
</script>

<style scoped>
.example-container {
  margin-bottom: 20px;
}

.value-display {
  margin-top: 16px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
}

.legend {
  margin-top: 12px;
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.holiday-color {
  background-color: #f56c6c;
}

.selected-color {
  background-color: #409eff;
}

:deep(.custom-date) {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.holiday-cell) {
  color: #f56c6c;
}

:deep(.selected-cell) {
  color: white;
  background-color: #409eff;
  border-radius: 4px;
}

:deep(.holiday-mark) {
  position: absolute;
  right: 2px;
  top: 2px;
  font-size: 10px;
  color: #f56c6c;
}
</style> 