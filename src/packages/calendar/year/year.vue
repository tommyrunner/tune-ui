<template>
  <div class="_years">
    <div
      v-for="year in yearList"
      :key="year"
      class="_year"
      :class="{
        _selected: isSelectedYear(year),
        't-disabled': isDisabled(new Date(year, 0, 1))
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
import { computed } from "vue";

defineOptions({ name: "TCalendarYear" });

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
  /** 选择年份 */
  (e: "select", year: number): void;
}>();

/**
 * @description 年份列表
 */
const yearList = computed(() => {
  const year = props.currentYear;
  const startYear = Math.floor(year / 10) * 10;
  return Array.from({ length: 12 }, (_, i) => startYear + i);
});

/**
 * @description 判断是否是选中的年份
 * @param year 年份
 */
const isSelectedYear = (year: number) => {
  if (!props.modelValue) return false;
  return new Date(props.modelValue).getFullYear() === year;
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
 * @description 处理年份选择
 * @param year 年份
 */
const handleYearSelect = (year: number) => {
  if (isDisabled(new Date(year, 0, 1))) return;
  emit("select", year);
};
</script>

<style lang="scss" scoped>
@import "./year.scss";
</style>
