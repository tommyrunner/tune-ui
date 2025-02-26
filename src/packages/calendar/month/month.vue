<template>
  <div class="_months">
    <div
      v-for="(month, index) in MONTH_NAMES"
      :key="month"
      class="_month"
      :class="{
        _selected: isSelectedMonth(index),
        't-disabled': isDisabled(new Date(currentYear, index, 1))
      }"
      @click="handleMonthSelect(index)"
    >
      {{ month }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MONTH_NAMES } from "../calendar";

defineOptions({ name: "TCalendarMonth" });

/**
 * @description 组件属性
 */
interface PropsType {
  /** 当前年份 */
  currentYear: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 不可选择的日期 */
  disabledDate?: (date: Date) => boolean;
  /** 当前选中的日期 */
  modelValue?: Date | string | number | null;
}

const props = withDefaults(defineProps<PropsType>(), {
  disabled: false,
  modelValue: null
});

/**
 * @description 组件事件
 */
const emit = defineEmits<{
  /** 选择月份 */
  (e: "select", month: number): void;
}>();

/**
 * @description 判断是否是选中的月份
 * @param month 月份索引
 */
const isSelectedMonth = (month: number) => {
  if (!props.modelValue) return false;
  const date = new Date(props.modelValue);
  return date.getFullYear() === props.currentYear && date.getMonth() === month;
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
 * @description 处理月份选择
 * @param month 月份索引
 */
const handleMonthSelect = (month: number) => {
  if (isDisabled(new Date(props.currentYear, month, 1))) return;
  emit("select", month);
};
</script>

<style lang="scss" scoped>
@import "./month.scss";
</style>
