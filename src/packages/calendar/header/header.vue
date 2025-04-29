<template>
  <div class="_header">
    <div class="_nav" :class="{ '_with-time': showTime }">
      <div class="_date-nav" :class="{ _centered: !showTime }">
        <div class="_nav-btn" :class="{ 't-disabled': disabled }" @click="handlePrev">
          <t-icon icon="left" />
        </div>
        <div class="_title">
          <span class="year-text" :class="{ active: mode === 'year' }" @click="handleYearTitleClick"
            >{{ currentYear }}{{ t("calendar.year") }}</span
          >
          <template v-if="mode !== 'year'">
            <span class="month-text" :class="{ active: mode === 'month' }" @click="handleMonthTitleClick">
              {{ currentMonth }}{{ t("calendar.month") }}
            </span>
          </template>
        </div>
        <div class="_nav-btn" :class="{ 't-disabled': disabled }" @click="handleNext">
          <t-icon icon="right" />
        </div>
      </div>

      <!-- 时间选择器 -->
      <slot name="time-picker" v-if="showTime && mode === 'date'"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./header.scss";
import { TIcon } from "@/packages/icon";
import type { ModeType } from "../calendar";
import { useI18n } from "@/hooks/useI18n";
defineOptions({ name: "TCalendarHeader" });

// 国际化
const { t } = useI18n();

/**
 * @description 组件属性
 */
interface PropsType {
  /** 当前年份 */
  currentYear: number;
  /** 当前月份 */
  currentMonth: number;
  /** 当前模式 */
  mode: ModeType;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示时间选择器 */
  showTime?: boolean;
}

const props = withDefaults(defineProps<PropsType>(), {
  disabled: false,
  showTime: false
});

/**
 * @description 组件事件
 */
const emit = defineEmits<{
  /** 上一个时间段 */
  (e: "prev"): void;
  /** 下一个时间段 */
  (e: "next"): void;
  /** 点击年份标题 */
  (e: "year-title-click"): void;
  /** 点击月份标题 */
  (e: "month-title-click"): void;
}>();

/**
 * @description 处理上一个时间段
 */
const handlePrev = () => {
  if (props.disabled) return;
  emit("prev");
};

/**
 * @description 处理下一个时间段
 */
const handleNext = () => {
  if (props.disabled) return;
  emit("next");
};

/**
 * @description 处理年份标题点击
 */
const handleYearTitleClick = () => {
  if (props.disabled) return;
  emit("year-title-click");
};

/**
 * @description 处理月份标题点击
 */
const handleMonthTitleClick = () => {
  if (props.disabled) return;
  emit("month-title-click");
};
</script>
