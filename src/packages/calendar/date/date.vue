<template>
  <div class="_dates">
    <!-- 星期标题 -->
    <div class="_weekdays">
      <div v-for="day in WEEK_DAYS" :key="day.value">{{ day }}</div>
    </div>

    <!-- 日期网格 -->
    <div class="_days">
      <div
        v-for="(date, index) in calendarDays"
        :key="index"
        class="_day"
        :class="{
          _today: isToday(date),
          _selected: isSelected(date),
          't-disabled': isDisabled(date),
          '_other-month': !isSameMonth(date, currentDate)
        }"
        @click="handleSelectDate(date)"
      >
        <slot name="date" :date="date">
          {{ date.getDate() }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./date.scss";
import { computed, inject } from "vue";
import { WEEK_DAYS, calendarKey } from "../constants";

defineOptions({ name: "TCalendarDate" });

/**
 * @description 组件属性
 */
interface PropsType {
  /** 当前日期 */
  currentDate: Date;
}

const props = defineProps<PropsType>();

// 注入日历上下文
const calendarContext = inject(calendarKey);

/**
 * @description 获取当月的所有日期（包括上月和下月的部分日期）
 */
const calendarDays = computed(() => {
  const year = props.currentDate.getFullYear();
  const month = props.currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 获取当月第一天是星期几
  const firstDayWeek = firstDay.getDay();
  // 获取当月最后一天是几号
  const lastDate = lastDay.getDate();

  const days: Date[] = [];

  // 添加上月的日期
  for (let i = 0; i < firstDayWeek; i++) {
    const date = new Date(year, month, -i);
    days.unshift(date);
  }

  // 添加当月的日期
  for (let i = 1; i <= lastDate; i++) {
    days.push(new Date(year, month, i));
  }

  // 添加下月的日期，补满 42 个格子（6行7列）
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
});

/**
 * @description 判断是否是今天
 * @param date 日期
 */
const isToday = (date: Date) => {
  const today = new Date();
  return isSameDay(date, today);
};

/**
 * @description 判断是否是选中日期
 * @param date 日期
 */
const isSelected = (date: Date) => {
  if (calendarContext?.internalValue && calendarContext.isSelect) {
    return isSameDay(date, calendarContext.internalValue);
  }
  return false;
};

/**
 * @description 判断是否禁用
 * @param date 日期
 */
const isDisabled = (date: Date) => {
  if (calendarContext?.disabled) return true;
  if (calendarContext?.disabledDate) return calendarContext.disabledDate(date);
  return false;
};

/**
 * @description 判断是否是同一天
 * @param date1 日期1
 * @param date2 日期2
 */
const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
  );
};

/**
 * @description 判断是否是同一月
 * @param date1 日期1
 * @param date2 日期2
 */
const isSameMonth = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
};

/**
 * @description 处理日期选择
 * @param date 日期
 */
const handleSelectDate = (date: Date) => {
  if (isDisabled(date) || calendarContext?.isSelect === false) return;

  // 保留原时间部分
  if (calendarContext?.showTime && calendarContext?.internalValue) {
    const selectedDate = new Date(date);
    const currentTime = new Date(calendarContext.internalValue);
    selectedDate.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
    date = selectedDate;
  }

  // 使用上下文中的处理函数
  if (calendarContext?.handleSelectDate) {
    calendarContext.handleSelectDate(date);
  }
};
</script>
