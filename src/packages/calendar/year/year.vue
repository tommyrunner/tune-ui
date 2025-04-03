<template>
  <div class="_years">
    <div
      v-for="year in yearRange"
      :key="year"
      class="_year"
      :class="{
        _selected: isSelected(year),
        't-disabled': isDisabled(year)
      }"
      @click="handleYearSelect(year)"
    >
      <slot name="year" :year="year">
        {{ year }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./year.scss";
import { calendarKey, type CalendarContextType } from "../constants";
import { computed, inject } from "vue";

defineOptions({ name: "TCalendarYear" });

/**
 * @description 组件属性
 */
interface PropsType {
  /** 当前年份 */
  currentYear: number;
}

const props = defineProps<PropsType>();

// 注入日历上下文
const calendarContext = inject<CalendarContextType>(calendarKey);

/**
 * @description 获取年份范围
 * 显示当前年份所在的10年范围，例如2020年显示2020-2029年
 */
const yearRange = computed(() => {
  const startYear = Math.floor(props.currentYear / 10) * 10;
  const years = [];
  for (let i = 0; i < 12; i++) {
    years.push(startYear + i);
  }
  return years;
});

/**
 * @description 判断年份是否被选中
 * @param year 年份
 */
const isSelected = (year: number) => {
  if (calendarContext?.internalValue && calendarContext.isSelect) {
    return calendarContext.internalValue.getFullYear() === year;
  }
  return false;
};

/**
 * @description 判断年份是否禁用
 * @param year 年份
 */
const isDisabled = (year: number) => {
  if (calendarContext?.disabled) return true;

  if (calendarContext?.disabledDate) {
    // 使用年份的第一天来判断是否禁用
    const date = new Date(year, 0, 1);
    return calendarContext.disabledDate(date);
  }

  return false;
};

/**
 * @description 处理年份选择
 * @param year 年份
 */
const handleYearSelect = (year: number) => {
  if (isDisabled(year) || calendarContext?.isSelect === false) return;

  // 使用上下文中的处理函数
  if (calendarContext?.handleYearSelect) {
    calendarContext.handleYearSelect(year);
  }
};
</script>
