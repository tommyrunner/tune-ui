<template>
  <div class="_months">
    <div
      v-for="(month, index) in TEXT_MONTH_NAMES"
      :key="month.value"
      class="_month"
      :class="{
        _selected: isSelected(index),
        't-disabled': isDisabled(index)
      }"
      @click="handleMonthSelect(index)"
    >
      <slot name="month" :month="month" :index="index">
        {{ month }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./month.scss";
import { inject } from "vue";
import { calendarKey, type CalendarContextType } from "../constants";
import { useI18nText } from "../i18n";

defineOptions({ name: "TCalendarMonth" });

/**
 * @description 组件属性
 */
interface PropsType {
  /** 当前年份 */
  currentYear: number;
}

const props = defineProps<PropsType>();
const { TEXT_MONTH_NAMES } = useI18nText();

// 注入日历上下文
const calendarContext = inject<CalendarContextType>(calendarKey);

/**
 * @description 判断月份是否被选中
 * @param month 月份索引（0-11）
 */
const isSelected = (month: number) => {
  if (calendarContext?.internalValue && calendarContext.isSelect) {
    const date = calendarContext.internalValue;
    return date.getFullYear() === props.currentYear && date.getMonth() === month;
  }
  return false;
};

/**
 * @description 判断月份是否禁用
 * @param month 月份索引（0-11）
 */
const isDisabled = (month: number) => {
  if (calendarContext?.disabled) return true;

  if (calendarContext?.disabledDate) {
    // 使用月份的第一天来判断是否禁用
    const date = new Date(props.currentYear, month, 1);
    return calendarContext.disabledDate(date);
  }

  return false;
};

/**
 * @description 处理月份选择
 * @param month 月份索引（0-11）
 */
const handleMonthSelect = (month: number) => {
  if (isDisabled(month) || calendarContext?.isSelect === false) return;

  // 使用上下文中的处理函数
  if (calendarContext?.handleMonthSelect) {
    calendarContext.handleMonthSelect(month);
  }
};
</script>
