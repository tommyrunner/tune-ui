<template>
  <div class="t-calendar">
    <!-- 日历头部 -->
    <div class="_header">
      <div class="_nav">
        <div class="_nav-btn" :class="{ 't-disabled': disabled }" @click="handlePrevMonth">
          <t-icon icon="left" />
        </div>
        <div class="_title">{{ currentTitle }}</div>
        <div class="_nav-btn" :class="{ 't-disabled': disabled }" @click="handleNextMonth">
          <t-icon icon="right" />
        </div>
      </div>
    </div>

    <!-- 日历主体 -->
    <div class="_body">
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

    <!-- 日历底部 -->
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import type { DateType, EmitsType, PropsType } from "./calendar";
import { WEEK_DAYS } from "./calendar";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TCalendar" });

// Props 和 Emits 定义
const props = withDefaults(defineProps<PropsType>(), {
  mode: "date",
  disabled: false
});

const model = defineModel<DateType>();
const emit = defineEmits<EmitsType>();

// 当前显示的日期
const currentDate = ref(model.value ? new Date(model.value) : new Date());

// 当前标题
const currentTitle = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;
  return `${year}年${month}月`;
});

/**
 * 获取当月的所有日期（包括上月和下月的部分日期）
 */
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
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
 * 判断是否是今天
 */
const isToday = (date: Date) => {
  const today = new Date();
  return isSameDay(date, today);
};

/**
 * 判断是否是选中日期
 */
const isSelected = (date: Date) => {
  if (!model.value) return false;
  return isSameDay(date, new Date(model.value));
};

/**
 * 判断是否禁用
 */
const isDisabled = (date: Date) => {
  if (props.disabled) return true;
  if (props.disabledDate) return props.disabledDate(date);
  return false;
};

/**
 * 判断是否是同一天
 */
const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
  );
};

/**
 * 判断是否是同一月
 */
const isSameMonth = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
};

/**
 * 跳转到指定日期
 */
const jumpToDate = (date: Date) => {
  if (props.disabled) return;
  const newDate = new Date(date);
  currentDate.value = newDate;
  model.value = newDate;
  emit("jump-to-date", newDate);
  emit("panel-change", props.mode);
  emit("change", newDate);
};

/**
 * 处理日期选择
 */
const handleSelectDate = (date: Date) => {
  if (isDisabled(date)) return;
  model.value = date;
  emit("change", date);
};

/**
 * 处理上个月
 */
const handlePrevMonth = () => {
  if (props.disabled) return;
  const date = new Date(currentDate.value);
  date.setMonth(date.getMonth() - 1);
  currentDate.value = date;
  emit("panel-change", props.mode);
};

/**
 * 处理下个月
 */
const handleNextMonth = () => {
  if (props.disabled) return;
  const date = new Date(currentDate.value);
  date.setMonth(date.getMonth() + 1);
  currentDate.value = date;
  emit("panel-change", props.mode);
};

// 暴露方法给父组件
defineExpose({
  jumpToDate
});
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
