<template>
  <div class="_dates">
    <!-- 星期标题 -->
    <div class="_weekdays">
      <div v-for="day in WEEK_DAYS" :key="day">{{ day }}</div>
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
import { computed } from "vue";
import { WEEK_DAYS } from "../calendar";

defineOptions({ name: "TCalendarDate" });

/**
 * @description 组件属性
 */
interface PropsType {
  /** 当前日期 */
  currentDate: Date;
  /** 是否禁用 */
  disabled?: boolean;
  /** 不可选择的日期 */
  disabledDate?: (date: Date) => boolean;
  /** 当前选中的日期 */
  modelValue?: Date | string | number | null;
  /** 是否显示时间选择器 */
  showTime?: boolean;
}

const props = withDefaults(defineProps<PropsType>(), {
  disabled: false,
  modelValue: null,
  showTime: false
});

/**
 * @description 组件事件
 */
const emit = defineEmits<{
  /** 选择日期 */
  (e: "select", date: Date): void;
}>();

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
  if (!props.modelValue) return false;
  return isSameDay(date, new Date(props.modelValue));
};

/**
 * @description 判断是否禁用
 * @param date 日期
 */
const isDisabled = (date: Date) => {
  if (props.disabled) return true;
  if (props.disabledDate) return props.disabledDate(date);
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
  if (isDisabled(date)) return;

  // 保留原时间部分
  if (props.showTime && props.modelValue) {
    const selectedDate = new Date(date);
    const currentTime = new Date(props.modelValue);
    selectedDate.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
    date = selectedDate;
  }

  emit("select", date);
};
</script>

<style lang="scss" scoped>
@import "./date.scss";
</style>
